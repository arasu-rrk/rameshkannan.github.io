const contactEnvironmentVariables = {
  email: 'RESUME_EMAIL',
  phone: 'RESUME_PHONE',
  address: 'RESUME_ADDRESS',
};

export async function onRequestGet({ env }) {
  const contacts = Object.fromEntries(
    Object.entries(contactEnvironmentVariables).map(([field, variableName]) => [
      field,
      typeof env[variableName] === 'string' ? env[variableName].trim() : '',
    ]),
  );

  if (Object.values(contacts).some((value) => !value)) {
    return Response.json({ error: 'Contact details are not fully configured.' }, {
      status: 503,
      headers: { 'Cache-Control': 'no-store' },
    });
  }

  return Response.json({ contacts }, {
    headers: {
      'Cache-Control': 'private, no-store, max-age=0',
      'X-Content-Type-Options': 'nosniff',
    },
  });
}
