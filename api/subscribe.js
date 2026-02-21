export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email } = req.body;

  if (!email || !email.includes('@')) {
    return res.status(400).json({ error: 'Ugyldig e-postadresse' });
  }

  try {
    const response = await fetch('https://api.brevo.com/v3/contacts', {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'content-type': 'application/json',
        'api-key': process.env.BREVO_API_KEY,
      },
      body: JSON.stringify({
        email,
        listIds: [4],
        updateEnabled: true,
      }),
    });

    const data = await response.json();

    if (response.ok || response.status === 201) {
      return res.status(200).json({ success: true });
    }

    if (data.code === 'duplicate_parameter') {
      return res.status(200).json({ success: true, already: true });
    }

    return res.status(400).json({ error: data.message || 'Noko gjekk gale' });
  } catch (error) {
    return res.status(500).json({ error: 'Serverfeil' });
  }
}
