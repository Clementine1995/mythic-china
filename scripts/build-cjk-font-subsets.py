"""Build the locked Mythic Han Sans SC/TC WOFF2 subsets.

This script is intentionally offline. It accepts only the two locally supplied,
hash-pinned Source Han Sans 2.005R variable TTF inputs and the committed,
hash-pinned character-set manifest.
"""

from __future__ import annotations

import argparse
import hashlib
import json
import platform
import sys
import tempfile
from pathlib import Path

import brotli
import fontTools
from fontTools import subset
from fontTools.ttLib import TTFont
from fontTools.varLib.instancer import instantiateVariableFont


PROJECT_ROOT = Path(__file__).resolve().parent.parent
CHARACTER_SET_PATH = PROJECT_ROOT / "src/assets/fonts/cjk-character-sets.json"
CHARACTER_SET_SHA256 = "8dfd1760fa83b504347db9f6d561e7ba67d86f954b5b183ff944a4d3b489ccf2"
SOURCE_INPUTS = {
    "zh-Hans": {
        "sha256": "68f866374d8ff04d2103c5b2907f1cab2dbec91ac0fb6ad0b801c6db0c1faa80",
        "family": "Mythic Han Sans SC",
        "postscriptPrefix": "MythicHanSansSC",
        "filePrefix": "mythic-han-sans-sc",
    },
    "zh-Hant": {
        "sha256": "1a273a56aa47250c7af95e461ee0c8236c60d7141e14a37bd18baccb1e851b19",
        "family": "Mythic Han Sans TC",
        "postscriptPrefix": "MythicHanSansTC",
        "filePrefix": "mythic-han-sans-tc",
    },
}
WEIGHTS = {
    400: "Regular",
    500: "Medium",
    600: "Semibold",
}
PRIMARY_NAME_IDS = (1, 2, 3, 4, 5, 6, 16, 17, 18, 19, 20, 21, 22, 25)
PRESERVED_NAME_IDS = (0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 16, 17)
LEGAL_NAME_IDS = (0, 7, 8, 9, 10, 11, 12, 13, 14)
VARIABLE_TABLES = {"avar", "cvar", "fvar", "gvar", "HVAR", "MVAR", "VVAR"}
TOOLCHAIN_VERSIONS = {
    "python": "3.13.13",
    "fontTools": "4.63.0",
    "Brotli": "1.2.0",
}


def sha256(path: Path) -> str:
    digest = hashlib.sha256()
    with path.open("rb") as stream:
        for block in iter(lambda: stream.read(1024 * 1024), b""):
            digest.update(block)
    return digest.hexdigest()


def code_points(strings: list[str]) -> set[int]:
    return {ord(character) for value in strings for character in value}


def load_character_sets() -> dict[str, set[int]]:
    if sha256(CHARACTER_SET_PATH) != CHARACTER_SET_SHA256:
        raise ValueError("The CJK character-set manifest does not match its production hash.")

    manifest = json.loads(CHARACTER_SET_PATH.read_text(encoding="utf-8"))
    if manifest.get("normalization") != "NFC":
        raise ValueError("The CJK character-set manifest must require NFC.")

    punctuation = str(manifest["sharedPunctuation"])
    result: dict[str, set[int]] = {}
    for locale, record in manifest["locales"].items():
        strings = [
            *record["contentStrings"],
            *record["requiredProbeStrings"],
            punctuation,
        ]
        required = code_points(strings)
        fallback_only = code_points([record["fallbackOnlyProbe"]])
        if required & fallback_only:
            raise ValueError(f"{locale} fallback-only probe overlaps the required subset.")
        if len(required) != record["expectedRequiredCodePointCount"]:
            raise ValueError(f"{locale} required character count drifted.")
        if len(code_points(record["contentStrings"])) != record["expectedContentCodePointCount"]:
            raise ValueError(f"{locale} projected-content character count drifted.")
        result[locale] = required
    return result


def legal_name_records(font: TTFont) -> list[tuple[int, int, int, int, str]]:
    return sorted(
        (
            record.nameID,
            record.platformID,
            record.platEncID,
            record.langID,
            record.toUnicode(),
        )
        for record in font["name"].names
        if record.nameID in LEGAL_NAME_IDS
    )


def set_primary_names(font: TTFont, family: str, postscript_prefix: str, weight: int, style: str) -> None:
    name_table = font["name"]
    for name_id in PRIMARY_NAME_IDS:
        name_table.removeNames(nameID=name_id)

    legacy_family = family if weight == 400 else f"{family} {style}"
    values = {
        1: legacy_family,
        2: "Regular",
        3: f"2.005R-subset-v1;{family};{style}",
        4: legacy_family,
        5: "Version 2.005; Mythic China subset 1",
        6: f"{postscript_prefix}-{style}",
        16: family,
        17: style,
    }
    for name_id, value in values.items():
        name_table.setName(value, name_id, 3, 1, 0x409)
        name_table.setName(value, name_id, 1, 0, 0)

    os2 = font["OS/2"]
    os2.usWeightClass = weight
    os2.fsSelection &= ~((1 << 0) | (1 << 5) | (1 << 6) | (1 << 9))
    os2.fsSelection |= 1 << 6
    font["head"].macStyle &= ~0b11
    font["post"].italicAngle = 0


def validate_toolchain() -> None:
    actual_versions = {
        "python": platform.python_version(),
        "fontTools": fontTools.__version__,
        "Brotli": brotli.__version__,
    }
    if actual_versions != TOOLCHAIN_VERSIONS:
        raise RuntimeError(
            f"Font-production toolchain mismatch: expected {TOOLCHAIN_VERSIONS}, got {actual_versions}"
        )


def subset_font(font: TTFont, required: set[int]) -> subset.Options:
    options = subset.Options()
    options.flavor = "woff2"
    options.ignore_missing_unicodes = False
    options.harfbuzz_repacker = False
    options.canonical_order = True
    options.recalc_timestamp = False
    options.name_IDs = list(PRESERVED_NAME_IDS)
    options.name_languages = ["*"]
    options.name_legacy = True
    options.notdef_glyph = True
    options.notdef_outline = True
    options.recommended_glyphs = True
    if "STAT" not in options.drop_tables:
        options.drop_tables.append("STAT")

    subsetter = subset.Subsetter(options=options)
    subsetter.populate(unicodes=required)
    subsetter.subset(font)
    font.flavor = "woff2"
    return options


def validate_output(path: Path, family: str, postscript_prefix: str, weight: int, style: str, required: set[int], expected_legal_names: list[tuple[int, int, int, int, str]]) -> dict[str, object]:
    font = TTFont(path, checkChecksums=2, recalcTimestamp=False)
    try:
        if font.flavor != "woff2":
            raise ValueError(f"{path.name} is not WOFF2.")
        unexpected_variable_tables = VARIABLE_TABLES & set(font.keys())
        if unexpected_variable_tables:
            raise ValueError(
                f"{path.name} retains variable tables: {sorted(unexpected_variable_tables)}"
            )
        cmap = set((font.getBestCmap() or {}).keys())
        if cmap != required:
            raise ValueError(f"{path.name} cmap does not exactly match the approved subset.")
        if font["OS/2"].usWeightClass != weight:
            raise ValueError(f"{path.name} has the wrong OS/2 weight class.")

        legacy_family = family if weight == 400 else f"{family} {style}"
        expected_names = {
            1: legacy_family,
            2: "Regular",
            3: f"2.005R-subset-v1;{family};{style}",
            4: legacy_family,
            5: "Version 2.005; Mythic China subset 1",
            6: f"{postscript_prefix}-{style}",
            16: family,
            17: style,
        }
        for name_id, expected in expected_names.items():
            values = {
                record.toUnicode()
                for record in font["name"].names
                if record.nameID == name_id
            }
            if values != {expected}:
                raise ValueError(f"{path.name} name ID {name_id} is not locked: {values}")
        for name_id in (18, 19, 20, 21, 22, 25):
            if any(record.nameID == name_id for record in font["name"].names):
                raise ValueError(f"{path.name} retains obsolete name ID {name_id}.")
        for record in font["name"].names:
            if record.nameID in PRIMARY_NAME_IDS and "Source" in record.toUnicode():
                raise ValueError(f"{path.name} retains the Reserved Font Name in a primary name.")
        if legal_name_records(font) != expected_legal_names:
            raise ValueError(f"{path.name} did not preserve upstream legal name records.")
        if "sil open font license" not in (font["name"].getDebugName(13) or "").casefold():
            raise ValueError(f"{path.name} is missing its embedded OFL record.")

        return {
            "file": path.name,
            "bytes": path.stat().st_size,
            "sha256": sha256(path),
            "family": font["name"].getDebugName(1),
            "style": font["name"].getDebugName(2),
            "weight": font["OS/2"].usWeightClass,
            "cmapCodePointCount": len(cmap),
        }
    finally:
        font.close()


def build_one(input_path: Path, output_path: Path, config: dict[str, str], weight: int, style: str, required: set[int]) -> dict[str, object]:
    font = TTFont(
        input_path,
        checkChecksums=2,
        recalcBBoxes=True,
        recalcTimestamp=False,
    )
    try:
        if not {"glyf", "gvar", "fvar"} <= set(font.keys()):
            raise ValueError(f"{input_path.name} is not the expected TrueType variable input.")
        if len(font["fvar"].axes) != 1 or font["fvar"].axes[0].axisTag != "wght":
            raise ValueError(f"{input_path.name} must expose exactly one wght axis.")
        axis = font["fvar"].axes[0]
        if not axis.minValue <= weight <= axis.maxValue:
            raise ValueError(f"{weight} is outside {input_path.name}'s wght axis.")
        font.flavor = None
        font.flavorData = None
        instantiateVariableFont(
            font,
            {"wght": float(weight)},
            inplace=True,
            optimize=True,
            updateFontNames=False,
            static=True,
        )
        if VARIABLE_TABLES & set(font.keys()):
            raise ValueError(f"{input_path.name} did not become a static instance.")
        expected_legal_names = legal_name_records(font)
        subset_options = subset_font(font, required)
        set_primary_names(
            font,
            config["family"],
            config["postscriptPrefix"],
            weight,
            style,
        )
        font.recalcBBoxes = True
        font.recalcTimestamp = False
        font.flavorData = None
        output_path.parent.mkdir(parents=True, exist_ok=True)
        with tempfile.TemporaryDirectory(dir=output_path.parent) as temporary_directory:
            temporary_path = Path(temporary_directory) / output_path.name
            subset.save_font(font, temporary_path, subset_options)
            temporary_path.replace(output_path)
    finally:
        font.close()

    return validate_output(
        output_path,
        config["family"],
        config["postscriptPrefix"],
        weight,
        style,
        required,
        expected_legal_names,
    )


def parse_arguments() -> argparse.Namespace:
    parser = argparse.ArgumentParser()
    parser.add_argument("--sc-input", required=True, type=Path)
    parser.add_argument("--tc-input", required=True, type=Path)
    parser.add_argument("--output-directory", required=True, type=Path)
    return parser.parse_args()


def main() -> int:
    arguments = parse_arguments()
    validate_toolchain()
    inputs = {
        "zh-Hans": arguments.sc_input.resolve(),
        "zh-Hant": arguments.tc_input.resolve(),
    }
    output_directory = arguments.output_directory.resolve()
    character_sets = load_character_sets()

    for locale, input_path in inputs.items():
        if not input_path.is_file():
            raise FileNotFoundError(f"Missing {locale} input: {input_path}")
        actual_hash = sha256(input_path)
        if actual_hash != SOURCE_INPUTS[locale]["sha256"]:
            raise ValueError(
                f"{locale} input hash mismatch: expected {SOURCE_INPUTS[locale]['sha256']}, got {actual_hash}"
            )

    results: list[dict[str, object]] = []
    for locale, input_path in inputs.items():
        config = SOURCE_INPUTS[locale]
        for weight, style in WEIGHTS.items():
            output_path = output_directory / f"{config['filePrefix']}-{weight}.woff2"
            results.append(
                build_one(
                    input_path,
                    output_path,
                    config,
                    weight,
                    style,
                    character_sets[locale],
                )
            )

    sys.stdout.write(json.dumps(results, ensure_ascii=True, indent=2) + "\n")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
