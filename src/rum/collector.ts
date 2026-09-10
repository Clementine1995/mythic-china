import { parseRumMeasurement, type RumMeasurement } from "./contract.ts";

export interface RumMetric {
  name: string;
  id: string;
  value: number;
}

export interface RumObservers {
  onLCP: (callback: (metric: RumMetric) => void) => void;
  onINP: (callback: (metric: RumMetric) => void) => void;
  onCLS: (callback: (metric: RumMetric) => void) => void;
}

export function collectRum({
  observers,
  canSend,
  randomId,
  send,
}: {
  observers: RumObservers;
  canSend: () => boolean;
  randomId: () => string;
  send: (measurement: RumMeasurement) => void;
}): void {
  // Only the latest library instance per metric is retained; BFCache starts a new one.
  const instances = new Map<
    string,
    { libraryId: string; measurement: RumMeasurement }
  >();
  const report = (metric: RumMetric): void => {
    if (!canSend()) return;
    const previous = instances.get(metric.name);
    const sameInstance = previous?.libraryId === metric.id;
    if (sameInstance && previous.measurement.value === metric.value) return;
    const measurement = parseRumMeasurement({
      name: metric.name,
      value: metric.value,
      measurementId: sameInstance
        ? previous.measurement.measurementId
        : randomId(),
      sequence: sameInstance ? previous.measurement.sequence + 1 : 1,
    });
    if (!measurement) return;
    instances.set(metric.name, { libraryId: metric.id, measurement });
    send(measurement);
  };
  observers.onLCP(report);
  observers.onINP(report);
  observers.onCLS(report);
}
