const translations = {
  en: {
    invalidJson: "Invalid JSON body.",
    missingSecretFields: "Missing required secret fields.",
    invalidSecretKind: "Invalid secret kind.",
    payloadTooLarge: "Encrypted payload exceeds the size limit.",
    secretIdTaken: "Secret id already exists.",
    missingSecretId: "Missing secret id.",
    secretMissing: "Secret not found or expired.",
    secretOpened: "Secret has already been opened."
  },
  zh: {
    invalidJson: "请求体 JSON 无效。",
    missingSecretFields: "缺少必要的秘密字段。",
    invalidSecretKind: "秘密类型无效。",
    payloadTooLarge: "加密内容超过大小限制。",
    secretIdTaken: "秘密 ID 已存在。",
    missingSecretId: "缺少秘密 ID。",
    secretMissing: "秘密不存在或已过期。",
    secretOpened: "该秘密已被打开。"
  },
  ja: {
    invalidJson: "JSON ボディが無効です。",
    missingSecretFields: "必要なシークレット項目が不足しています。",
    invalidSecretKind: "シークレット種別が無効です。",
    payloadTooLarge: "暗号化データがサイズ制限を超えています。",
    secretIdTaken: "シークレット ID はすでに存在します。",
    missingSecretId: "シークレット ID がありません。",
    secretMissing: "シークレットが存在しないか、有効期限が切れています。",
    secretOpened: "このシークレットはすでに開かれています。"
  },
  ko: {
    invalidJson: "잘못된 JSON 본문입니다.",
    missingSecretFields: "필수 시크릿 필드가 없습니다.",
    invalidSecretKind: "시크릿 종류가 올바르지 않습니다.",
    payloadTooLarge: "암호화된 데이터가 크기 제한을 초과했습니다.",
    secretIdTaken: "시크릿 ID가 이미 존재합니다.",
    missingSecretId: "시크릿 ID가 없습니다.",
    secretMissing: "시크릿이 없거나 만료되었습니다.",
    secretOpened: "이 시크릿은 이미 열렸습니다."
  }
} as const;

type SupportedLang = keyof typeof translations;

export function getTranslator(request: Request) {
  const url = new URL(request.url);
  const lang = (url.searchParams.get("lang") || "en") as SupportedLang;
  const messages = translations[lang] || translations.en;

  return function t(key: keyof typeof translations.en) {
    return messages[key] || translations.en[key];
  };
}
