export function validateBirthday (birthday: string): Date | null {
    // validate correct format
    const match = birthday.match(/^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/);
    if (!match) {
        return null;
    }

    // Separate day, month and year
    const [day, month, year] = birthday.split('/').map(Number);

    // Create date
    const birthDate = new Date(Date.UTC(year!, month! - 1, day));

    // Current date UTC
    const today = new Date();
    const todayUTC = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate()));

    // Calculate limit date: today - 12 years
    const limitDate = new Date(Date.UTC(todayUTC.getUTCFullYear() - 12, todayUTC.getUTCMonth(), todayUTC.getUTCDate()));

    // Validate if birthdate superates the limitDate
    if (birthDate > limitDate) {
        return null;
    }

    return birthDate;
}