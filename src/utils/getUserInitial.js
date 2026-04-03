const INITIAL_MAP = {
  ᄀ: 'K',
  ᄁ: 'K',
  ᄂ: 'N',
  ᄃ: 'D',
  ᄄ: 'D',
  ᄅ: 'R',
  ᄆ: 'M',
  ᄇ: 'B',
  ᄈ: 'B',
  ᄉ: 'S',
  ᄊ: 'S',
  ᄋ: 'A',
  ᄌ: 'J',
  ᄍ: 'J',
  ᄎ: 'C',
  ᄏ: 'K',
  ᄐ: 'T',
  ᄑ: 'P',
  ᄒ: 'H',
};

export default function getUserInitial(user) {
  if (user?.nickname) return user.nickname[0].toUpperCase();

  const char = user?.name?.[0];
  if (!char) return 'P';

  const decomposed = char.normalize('NFD')[0];
  return INITIAL_MAP[decomposed] ?? char.toUpperCase();
}
