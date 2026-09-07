import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export const LANGUAGES = [
  { code: "pt", label: "Português", flag: "🇧🇷" },
  { code: "en", label: "English", flag: "🇺🇸" },
  { code: "es", label: "Español", flag: "🇪🇸" },
  { code: "fr", label: "Français", flag: "🇫🇷" },
] as const;

export type Lang = (typeof LANGUAGES)[number]["code"];

const LANG_CODES = LANGUAGES.map((l) => l.code) as readonly string[];

type Dict = Record<string, string>;

const pt: Dict = {
  brand: "Atlas Quiz",
  gameTitle: "Onde fica esse país?",
  duel: "Duelo 1x1",
  signInToDuel: "Entrar para duelar",
  points: "Pontos",
  round: "Rodada",
  streak: "Sequência",
  findOnMap: "Encontre no mapa",
  correctPlus: "Acertou! +{n} pontos.",
  wrongMsg: "Errou. O país estava marcado em verde.",
  selectedMsg: "País selecionado. Confirme sua resposta.",
  clickMsg: "Clique em um país no mapa.",
  next: "Próximo país",
  check: "Checar",
  correctAnswer: "Resposta correta",
  youPicked: "Você marcou {name}",
  otherCountry: "outro país",
  hints: "Dicas",
  worth: "Valem {n} pts",
  continent: "Continente",
  region: "Região",
  language: "Idioma",
  noLanguage: "Sem idioma oficial",
  noMoreHints: "Sem mais dicas",
  revealHint: "Revelar dica {n} de {max}",
  chooseLanguage: "Escolher idioma",
  languageChanged: "Idioma alterado para {name}.",
  // Auth
  authSignIn: "Entrar",
  authSignUp: "Criar conta",
  authCodeMode: "Entrar com código",
  authSubtitle: "Sua conta guarda seu apelido e libera os duelos 1x1.",
  authCodeSubtitle: "Receba um código de 6 dígitos no seu e-mail, sem senha.",
  nickname: "Apelido",
  nicknamePlaceholder: "Como quer aparecer no duelo",
  email: "E-mail",
  password: "Senha",
  passwordPlaceholder: "Mínimo de 6 caracteres",
  wait: "Aguarde...",
  sendCode: "Enviar código",
  continueGoogle: "Continuar com o Google",
  useCodeInstead: "Entrar com código por e-mail",
  usePasswordInstead: "Entrar com senha",
  haveAccount: "Já tenho conta",
  noAccount: "Não tem conta? Criar agora",
  confirmEmail: "Confirme seu e-mail",
  codeSentTo: "Digite o código de 6 dígitos enviado para {email}.",
  verificationCode: "Código de verificação",
  verifying: "Verificando...",
  confirmCode: "Confirmar código",
  resendCode: "Reenviar código",
  codeSent: "Enviamos um código de 6 dígitos para o seu e-mail.",
  codeResent: "Enviamos um novo código para o seu e-mail.",
  back: "Voltar",
  genericError: "Não foi possível continuar.",
  invalidCode: "Código inválido ou expirado.",
  resendError: "Não foi possível reenviar o código.",
  googleError: "Não foi possível entrar com o Google.",
  // Duel lobby
  soloMode: "Modo solo",
  duelSubtitle: "Melhor de 5 países. Quem acertar mais, vence.",
  signOut: "Sair",
  searching: "Procurando...",
  playNow: "Jogar agora (fila pública)",
  queueHelp: "Você entra na sala de quem já está esperando — ou abre uma e aguarda alguém.",
  playFriend: "Jogar com um amigo",
  creating: "Criando...",
  createRoom: "Criar sala com código",
  codePlaceholder: "CÓDIGO",
  enter: "Entrar",
  somethingWrong: "Algo deu errado.",
};

const en: Dict = {
  brand: "Atlas Quiz",
  gameTitle: "Where is this country?",
  duel: "1v1 Duel",
  signInToDuel: "Sign in to duel",
  points: "Points",
  round: "Round",
  streak: "Streak",
  findOnMap: "Find it on the map",
  correctPlus: "Correct! +{n} points.",
  wrongMsg: "Wrong. The country is highlighted in green.",
  selectedMsg: "Country selected. Confirm your answer.",
  clickMsg: "Click a country on the map.",
  next: "Next country",
  check: "Check",
  correctAnswer: "Correct answer",
  youPicked: "You picked {name}",
  otherCountry: "another country",
  hints: "Hints",
  worth: "Worth {n} pts",
  continent: "Continent",
  region: "Region",
  language: "Language",
  noLanguage: "No official language",
  noMoreHints: "No hints left",
  revealHint: "Reveal hint {n} of {max}",
  chooseLanguage: "Choose language",
  languageChanged: "Language switched to {name}.",
  authSignIn: "Sign in",
  authSignUp: "Create account",
  authCodeMode: "Sign in with a code",
  authSubtitle: "Your account keeps your nickname and unlocks 1v1 duels.",
  authCodeSubtitle: "Get a 6-digit code by email, no password needed.",
  nickname: "Nickname",
  nicknamePlaceholder: "How you show up in duels",
  email: "Email",
  password: "Password",
  passwordPlaceholder: "At least 6 characters",
  wait: "Please wait...",
  sendCode: "Send code",
  continueGoogle: "Continue with Google",
  useCodeInstead: "Sign in with an email code",
  usePasswordInstead: "Sign in with a password",
  haveAccount: "I already have an account",
  noAccount: "No account? Create one",
  confirmEmail: "Confirm your email",
  codeSentTo: "Enter the 6-digit code sent to {email}.",
  verificationCode: "Verification code",
  verifying: "Verifying...",
  confirmCode: "Confirm code",
  resendCode: "Resend code",
  codeSent: "We sent a 6-digit code to your email.",
  codeResent: "We sent a new code to your email.",
  back: "Back",
  genericError: "Something went wrong.",
  invalidCode: "Invalid or expired code.",
  resendError: "Could not resend the code.",
  googleError: "Google sign-in failed.",
  soloMode: "Solo mode",
  duelSubtitle: "Best of 5 countries. Most correct wins.",
  signOut: "Sign out",
  searching: "Searching...",
  playNow: "Play now (public queue)",
  queueHelp: "You join whoever is already waiting — or open a room and wait.",
  playFriend: "Play with a friend",
  creating: "Creating...",
  createRoom: "Create a room with a code",
  codePlaceholder: "CODE",
  enter: "Join",
  somethingWrong: "Something went wrong.",
};

const es: Dict = {
  brand: "Atlas Quiz",
  gameTitle: "¿Dónde queda este país?",
  duel: "Duelo 1x1",
  signInToDuel: "Entra para duelar",
  points: "Puntos",
  round: "Ronda",
  streak: "Racha",
  findOnMap: "Encuéntralo en el mapa",
  correctPlus: "¡Correcto! +{n} puntos.",
  wrongMsg: "Fallaste. El país está marcado en verde.",
  selectedMsg: "País seleccionado. Confirma tu respuesta.",
  clickMsg: "Haz clic en un país del mapa.",
  next: "Siguiente país",
  check: "Comprobar",
  correctAnswer: "Respuesta correcta",
  youPicked: "Marcaste {name}",
  otherCountry: "otro país",
  hints: "Pistas",
  worth: "Valen {n} pts",
  continent: "Continente",
  region: "Región",
  language: "Idioma",
  noLanguage: "Sin idioma oficial",
  noMoreHints: "No hay más pistas",
  revealHint: "Revelar pista {n} de {max}",
  chooseLanguage: "Elegir idioma",
  languageChanged: "Idioma cambiado a {name}.",
  authSignIn: "Entrar",
  authSignUp: "Crear cuenta",
  authCodeMode: "Entrar con código",
  authSubtitle: "Tu cuenta guarda tu apodo y habilita los duelos 1x1.",
  authCodeSubtitle: "Recibe un código de 6 dígitos por correo, sin contraseña.",
  nickname: "Apodo",
  nicknamePlaceholder: "Cómo quieres aparecer en el duelo",
  email: "Correo",
  password: "Contraseña",
  passwordPlaceholder: "Mínimo 6 caracteres",
  wait: "Espera...",
  sendCode: "Enviar código",
  continueGoogle: "Continuar con Google",
  useCodeInstead: "Entrar con código por correo",
  usePasswordInstead: "Entrar con contraseña",
  haveAccount: "Ya tengo cuenta",
  noAccount: "¿Sin cuenta? Crear ahora",
  confirmEmail: "Confirma tu correo",
  codeSentTo: "Escribe el código de 6 dígitos enviado a {email}.",
  verificationCode: "Código de verificación",
  verifying: "Verificando...",
  confirmCode: "Confirmar código",
  resendCode: "Reenviar código",
  codeSent: "Enviamos un código de 6 dígitos a tu correo.",
  codeResent: "Enviamos un nuevo código a tu correo.",
  back: "Volver",
  genericError: "No se pudo continuar.",
  invalidCode: "Código inválido o vencido.",
  resendError: "No se pudo reenviar el código.",
  googleError: "No se pudo entrar con Google.",
  soloMode: "Modo solo",
  duelSubtitle: "Al mejor de 5 países. Gana quien acierte más.",
  signOut: "Salir",
  searching: "Buscando...",
  playNow: "Jugar ahora (fila pública)",
  queueHelp: "Entras en la sala de quien ya espera — o abres una y esperas.",
  playFriend: "Jugar con un amigo",
  creating: "Creando...",
  createRoom: "Crear sala con código",
  codePlaceholder: "CÓDIGO",
  enter: "Entrar",
  somethingWrong: "Algo salió mal.",
};

const fr: Dict = {
  brand: "Atlas Quiz",
  gameTitle: "Où se trouve ce pays ?",
  duel: "Duel 1c1",
  signInToDuel: "Connecte-toi pour duel",
  points: "Points",
  round: "Manche",
  streak: "Série",
  findOnMap: "Trouve-le sur la carte",
  correctPlus: "Bravo ! +{n} points.",
  wrongMsg: "Raté. Le pays est en vert.",
  selectedMsg: "Pays sélectionné. Confirme ta réponse.",
  clickMsg: "Clique sur un pays de la carte.",
  next: "Pays suivant",
  check: "Valider",
  correctAnswer: "Bonne réponse",
  youPicked: "Tu as choisi {name}",
  otherCountry: "un autre pays",
  hints: "Indices",
  worth: "Valent {n} pts",
  continent: "Continent",
  region: "Région",
  language: "Langue",
  noLanguage: "Pas de langue officielle",
  noMoreHints: "Plus d'indices",
  revealHint: "Révéler l'indice {n} sur {max}",
  chooseLanguage: "Choisir la langue",
  languageChanged: "Langue changée en {name}.",
  authSignIn: "Se connecter",
  authSignUp: "Créer un compte",
  authCodeMode: "Se connecter avec un code",
  authSubtitle: "Ton compte garde ton pseudo et ouvre les duels 1c1.",
  authCodeSubtitle: "Reçois un code à 6 chiffres par e-mail, sans mot de passe.",
  nickname: "Pseudo",
  nicknamePlaceholder: "Ton nom pendant les duels",
  email: "E-mail",
  password: "Mot de passe",
  passwordPlaceholder: "6 caractères minimum",
  wait: "Patiente...",
  sendCode: "Envoyer le code",
  continueGoogle: "Continuer avec Google",
  useCodeInstead: "Se connecter avec un code e-mail",
  usePasswordInstead: "Se connecter avec un mot de passe",
  haveAccount: "J'ai déjà un compte",
  noAccount: "Pas de compte ? En créer un",
  confirmEmail: "Confirme ton e-mail",
  codeSentTo: "Saisis le code à 6 chiffres envoyé à {email}.",
  verificationCode: "Code de vérification",
  verifying: "Vérification...",
  confirmCode: "Confirmer le code",
  resendCode: "Renvoyer le code",
  codeSent: "Nous avons envoyé un code à 6 chiffres par e-mail.",
  codeResent: "Nous avons envoyé un nouveau code par e-mail.",
  back: "Retour",
  genericError: "Impossible de continuer.",
  invalidCode: "Code invalide ou expiré.",
  resendError: "Impossible de renvoyer le code.",
  googleError: "Connexion Google impossible.",
  soloMode: "Mode solo",
  duelSubtitle: "Le meilleur sur 5 pays l'emporte.",
  signOut: "Se déconnecter",
  searching: "Recherche...",
  playNow: "Jouer maintenant (file publique)",
  queueHelp: "Tu rejoins une personne qui attend — ou tu ouvres une salle.",
  playFriend: "Jouer avec un ami",
  creating: "Création...",
  createRoom: "Créer une salle avec code",
  codePlaceholder: "CODE",
  enter: "Rejoindre",
  somethingWrong: "Une erreur est survenue.",
};

const DICTS: Record<Lang, Dict> = { pt, en, es, fr };

/** Continent labels keyed by the Portuguese value stored in the country data. */
const REGIONS: Record<string, Partial<Record<Lang, string>>> = {
  "África": { en: "Africa", es: "África", fr: "Afrique" },
  "Américas": { en: "Americas", es: "América", fr: "Amériques" },
  "Ásia": { en: "Asia", es: "Asia", fr: "Asie" },
  Europa: { en: "Europe", es: "Europa", fr: "Europe" },
  Oceania: { en: "Oceania", es: "Oceanía", fr: "Océanie" },
  "Antártica": { en: "Antarctica", es: "Antártida", fr: "Antarctique" },
};

const SUBREGIONS: Record<string, Partial<Record<Lang, string>> & { pt?: string }> = {
  "Melanésia": { en: "Melanesia", es: "Melanesia", fr: "Mélanésie" },
  "Leste da África": { en: "East Africa", es: "África Oriental", fr: "Afrique de l'Est" },
  "Norte da África": { en: "North Africa", es: "África del Norte", fr: "Afrique du Nord" },
  "North America": {
    pt: "América do Norte",
    en: "North America",
    es: "América del Norte",
    fr: "Amérique du Nord",
  },
  "Ásia Central": { en: "Central Asia", es: "Asia Central", fr: "Asie centrale" },
  "Sudeste Asiático": {
    en: "Southeast Asia",
    es: "Sudeste Asiático",
    fr: "Asie du Sud-Est",
  },
  "América do Sul": { en: "South America", es: "América del Sur", fr: "Amérique du Sud" },
  "África Central": { en: "Central Africa", es: "África Central", fr: "Afrique centrale" },
  Caribe: { en: "Caribbean", es: "Caribe", fr: "Caraïbes" },
  "Ásia do Norte (Sibéria)": {
    en: "North Asia (Siberia)",
    es: "Asia del Norte (Siberia)",
    fr: "Asie du Nord (Sibérie)",
  },
  "Norte da Europa": { en: "Northern Europe", es: "Europa del Norte", fr: "Europe du Nord" },
  "Antártica": { en: "Antarctica", es: "Antártida", fr: "Antarctique" },
  "Sul da África": { en: "Southern Africa", es: "África Austral", fr: "Afrique australe" },
  "América Central": {
    en: "Central America",
    es: "América Central",
    fr: "Amérique centrale",
  },
  "Oeste da Europa": { en: "Western Europe", es: "Europa Occidental", fr: "Europe de l'Ouest" },
  "Oeste da África": { en: "West Africa", es: "África Occidental", fr: "Afrique de l'Ouest" },
  "Oeste da Ásia (Oriente Médio)": {
    en: "West Asia (Middle East)",
    es: "Asia Occidental (Oriente Medio)",
    fr: "Asie de l'Ouest (Moyen-Orient)",
  },
  "Leste da Ásia": { en: "East Asia", es: "Asia Oriental", fr: "Asie de l'Est" },
  "Sul da Ásia": { en: "South Asia", es: "Asia del Sur", fr: "Asie du Sud" },
  "Leste Europeu": { en: "Eastern Europe", es: "Europa del Este", fr: "Europe de l'Est" },
  "Europa Central": { en: "Central Europe", es: "Europa Central", fr: "Europe centrale" },
  "Southeast Europe": {
    pt: "Sudeste da Europa",
    en: "Southeast Europe",
    es: "Europa del Sudeste",
    fr: "Europe du Sud-Est",
  },
  "Sul da Europa": { en: "Southern Europe", es: "Europa del Sur", fr: "Europe du Sud" },
  "Austrália e Nova Zelândia": {
    en: "Australia and New Zealand",
    es: "Australia y Nueva Zelanda",
    fr: "Australie et Nouvelle-Zélande",
  },
};

export type Settings = {
  lang: Lang;
  maxHints: number;
  region: string;
};

const DEFAULTS: Settings = { lang: "pt", maxHints: 3, region: "all" };
const STORAGE_KEY = "atlas-quiz-settings";

function detectLang(): Lang {
  if (typeof navigator === "undefined") return DEFAULTS.lang;
  for (const nav of navigator.languages ?? [navigator.language]) {
    const base = (nav ?? "").slice(0, 2).toLowerCase();
    if (LANG_CODES.includes(base)) return base as Lang;
  }
  return DEFAULTS.lang;
}

type CountryLike = { name: string; en: string; region?: string; subregion?: string };

type Ctx = {
  settings: Settings;
  lang: Lang;
  setLang: (lang: Lang) => void;
  update: (patch: Partial<Settings>) => void;
  t: (key: string, vars?: Record<string, string | number>) => string;
  countryName: (country: CountryLike | null | undefined, fallback?: string) => string;
  regionName: (value: string) => string;
  subregionName: (value: string) => string;
};

const SettingsContext = createContext<Ctx | null>(null);

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<Settings>(DEFAULTS);

  useEffect(() => {
    let next: Settings | null = null;
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) next = { ...DEFAULTS, ...(JSON.parse(raw) as Partial<Settings>) };
    } catch {
      /* ignore */
    }
    setSettings(next ?? { ...DEFAULTS, lang: detectLang() });
  }, []);

  // Keeps the document language in sync for screen readers and search engines.
  useEffect(() => {
    if (typeof document !== "undefined") document.documentElement.lang = settings.lang;
  }, [settings.lang]);

  const update = useCallback((patch: Partial<Settings>) => {
    setSettings((prev) => {
      const next = { ...prev, ...patch };
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {
        /* ignore */
      }
      return next;
    });
  }, []);

  const setLang = useCallback((lang: Lang) => update({ lang }), [update]);

  const t = useCallback(
    (key: string, vars?: Record<string, string | number>) => {
      const dict = DICTS[settings.lang] ?? pt;
      let out = dict[key] ?? pt[key] ?? key;
      if (vars) {
        for (const [k, v] of Object.entries(vars)) out = out.replaceAll(`{${k}}`, String(v));
      }
      return out;
    },
    [settings.lang],
  );

  const countryName = useCallback(
    (country: CountryLike | null | undefined, fallback = "") => {
      if (!country) return fallback;
      // Data ships Portuguese and English names; Spanish and French fall back to English.
      return settings.lang === "pt" ? country.name : (country.en ?? country.name);
    },
    [settings.lang],
  );

  const regionName = useCallback(
    (value: string) => REGIONS[value]?.[settings.lang] ?? value,
    [settings.lang],
  );

  const subregionName = useCallback(
    (value: string) => SUBREGIONS[value]?.[settings.lang] ?? value,
    [settings.lang],
  );

  const value = useMemo(
    () => ({
      settings,
      lang: settings.lang,
      setLang,
      update,
      t,
      countryName,
      regionName,
      subregionName,
    }),
    [settings, setLang, update, t, countryName, regionName, subregionName],
  );
  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>;
}

export function useSettings() {
  const ctx = useContext(SettingsContext);
  if (!ctx) throw new Error("useSettings must be used inside SettingsProvider");
  return ctx;
}
