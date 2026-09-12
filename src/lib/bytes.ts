/**
 * A byte count as the number a person reads: "4.9" megabytes, one decimal.
 *
 * Shared by the Settings door and the saved-audio sheet, so the two can never
 * round a total differently. No unit in the string: the caller sets "MB"
 * beside it where the layout wants it.
 */
export const megabytes = (bytes: number): string => (bytes / 1_000_000).toFixed(1);
