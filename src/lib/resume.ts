import resume from '@/data/resume.json';

const monthNumbers: Record<string, number> = {
  Jan: 0,
  Feb: 1,
  Mar: 2,
  Apr: 3,
  May: 4,
  Jun: 5,
  Jul: 6,
  Aug: 7,
  Sep: 8,
  Oct: 9,
  Nov: 10,
  Dec: 11,
};

/** Replaces the profile's experience placeholder with years since the earliest role. */
export function getResumeProfile(asOf = new Date()): string {
  const firstExperienceMonth = Math.min(...resume.experience.map(({ dates }) => {
    const match = /^([A-Za-z]{3})\s+(\d{4})\s*[–-]/.exec(dates);
    const month = match?.[1];
    const year = Number(match?.[2]);
    const monthNumber = month ? monthNumbers[month] : undefined;

    if (monthNumber === undefined || !Number.isInteger(year)) {
      throw new Error(`Unable to calculate experience duration from "${dates}".`);
    }

    return year * 12 + monthNumber;
  }));
  const currentMonth = asOf.getFullYear() * 12 + asOf.getMonth();
  const yearsOfExperience = Math.max(0, Math.floor((currentMonth - firstExperienceMonth) / 12));
  const placeholder = '{{experienceYears}}';

  if (!resume.profile.includes(placeholder)) {
    throw new Error(`Resume profile is missing the ${placeholder} placeholder.`);
  }

  return resume.profile.replace(placeholder, String(yearsOfExperience));
}
