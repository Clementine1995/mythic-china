export const contentIdPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export type ContentFileExtension = ".md" | ".yml";

export function contentIdFromEntryPath(
  entryPath: string,
  extension: ContentFileExtension,
): string {
  const normalizedPath = entryPath.replaceAll("\\", "/");

  if (normalizedPath.includes("/")) {
    throw new Error(`Content records cannot be nested: ${entryPath}`);
  }

  if (!normalizedPath.endsWith(extension)) {
    throw new Error(
      `Expected a ${extension} content record, received: ${entryPath}`,
    );
  }

  const id = normalizedPath.slice(0, -extension.length);

  if (!contentIdPattern.test(id)) {
    throw new Error(`Content filename is not a kebab-case ID: ${entryPath}`);
  }

  return id;
}
