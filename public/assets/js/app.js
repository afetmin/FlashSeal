const MAX_IMAGE_BYTES = 15 * 1024 * 1024;
const SECRET_ID_LENGTH = 12;
const SECRET_ID_ALPHABET = "23456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";
const VIEW_DURATION_SECONDS = 60;
const DEFAULT_LANGUAGE = "en";

const translations = {
  en: {
    languageShort: "EN",
    languageName: "English",
    heroTitle: "Share secrets, once.",
    heroSubtitleLine1: "Encrypted in your browser.",
    heroSubtitleLine2: "Self-destructs after viewing.",
    tabCreate: "Create Secret",
    tabOpen: "Open Secret",
    kindText: "Text",
    kindImage: "Image",
    textPlaceholder: "Paste your secret text here...",
    imagePickerTitle: "Choose an image",
    imagePickerHelp: "PNG, JPG, WEBP up to 15MB",
    createButton: "Create sealed link",
    createHint: "Only the first successful viewer can open it. Unopened secrets expire in 1 hour.",
    resultLabel: "Share link",
    copyButton: "Copy link",
    openLabel: "Paste a FlashSeal link",
    openInputPlaceholder: "https://flashseal.app/s/abc123#k=...",
    openButton: "Open secret",
    viewerTitle: "Secret opened",
    countdownLabel: "Burns in {seconds}s",
    featureEncryptionTitle: "End-to-end encryption",
    featureEncryptionBody: "We can't see your data. Only you and your recipient hold the keys.",
    featureOnceTitle: "One-time access",
    featureOnceBody: "The secret link expires immediately after the first successful view.",
    featureWindowTitle: "60-second window",
    featureWindowBody: "Once opened, the recipient has 60 seconds before data is wiped.",
    featureExpiryTitle: "1-hour expiry",
    featureExpiryBody: "Unopened secrets are automatically deleted after 60 minutes.",
    footerCopy: "© 2026 FlashSeal. Privacy by design.",
    pageTitle: "FlashSeal | Share secrets, once.",
    pageDescription: "Create encrypted text and image links that self-destruct 60 seconds after the first successful open.",
    creating: "Encrypting and sealing your secret...",
    created: "Your FlashSeal link is ready.",
    copied: "Link copied to clipboard.",
    imageSelected: "Image ready to seal.",
    emptyText: "Enter some text before creating a secret.",
    imageRequired: "Choose an image before creating a secret.",
    imageTooLarge: "Image exceeds the 15MB limit.",
    createFailed: "Could not create the secret.",
    openFailed: "Could not open the secret.",
    opening: "Opening your secret...",
    invalidLink: "This FlashSeal link is invalid.",
    missingKey: "The decryption key is missing from this link.",
    decryptFailed: "Could not decrypt this secret.",
    secretOpened: "This secret was already opened or burned.",
    secretMissing: "This secret does not exist or has expired.",
    secretBurned: "This secret has burned.",
    secretReady: "Secret opened successfully.",
    burnedNow: "This secret has burned and can no longer be viewed."
  },
  zh: {
    languageShort: "中",
    languageName: "简体中文",
    heroTitle: "分享一次性的秘密。",
    heroSubtitleLine1: "在你的浏览器中加密。",
    heroSubtitleLine2: "查看后自动焚毁。",
    tabCreate: "创建秘密",
    tabOpen: "打开秘密",
    kindText: "文本",
    kindImage: "图片",
    textPlaceholder: "把秘密文本粘贴到这里...",
    imagePickerTitle: "选择图片",
    imagePickerHelp: "支持 PNG、JPG、WEBP，最大 15MB",
    createButton: "生成密封链接",
    createHint: "只有第一个成功打开的人能看到内容。未打开的秘密会在 1 小时后过期。",
    resultLabel: "分享链接",
    copyButton: "复制链接",
    openLabel: "粘贴 FlashSeal 链接",
    openInputPlaceholder: "https://flashseal.app/s/abc123#k=...",
    openButton: "打开秘密",
    viewerTitle: "秘密已打开",
    countdownLabel: "{seconds} 秒后焚毁",
    featureEncryptionTitle: "端到端加密",
    featureEncryptionBody: "我们无法看到你的数据，只有你和接收者持有密钥。",
    featureOnceTitle: "一次访问",
    featureOnceBody: "链接只允许首个成功查看者打开，随后立即失效。",
    featureWindowTitle: "60 秒窗口",
    featureWindowBody: "秘密一旦打开，会保留 60 秒，随后数据会被清除。",
    featureExpiryTitle: "1 小时过期",
    featureExpiryBody: "未打开的秘密会在 60 分钟后自动删除。",
    footerCopy: "© 2026 FlashSeal。隐私优先设计。",
    pageTitle: "FlashSeal | 一次性的秘密分享",
    pageDescription: "创建加密的文本或图片链接，首个成功打开后 60 秒自动焚毁。",
    creating: "正在加密并封存你的秘密...",
    created: "FlashSeal 链接已生成。",
    copied: "链接已复制到剪贴板。",
    imageSelected: "图片已准备好加密。",
    emptyText: "创建秘密前请先输入文本。",
    imageRequired: "创建秘密前请先选择图片。",
    imageTooLarge: "图片超过 15MB 限制。",
    createFailed: "创建秘密失败。",
    openFailed: "打开秘密失败。",
    opening: "正在打开秘密...",
    invalidLink: "这个 FlashSeal 链接无效。",
    missingKey: "链接中缺少解密密钥。",
    decryptFailed: "秘密解密失败。",
    secretOpened: "该秘密已被打开或已焚毁。",
    secretMissing: "该秘密不存在或已过期。",
    secretBurned: "该秘密已焚毁。",
    secretReady: "秘密打开成功。",
    burnedNow: "这个秘密已焚毁，无法再次查看。"
  },
  ja: {
    languageShort: "日",
    languageName: "日本語",
    heroTitle: "秘密を、一度だけ共有。",
    heroSubtitleLine1: "ブラウザ内で暗号化。",
    heroSubtitleLine2: "閲覧後に自動で焼却。",
    tabCreate: "シークレットを作成",
    tabOpen: "シークレットを開く",
    kindText: "テキスト",
    kindImage: "画像",
    textPlaceholder: "ここに秘密のテキストを貼り付けてください...",
    imagePickerTitle: "画像を選択",
    imagePickerHelp: "PNG、JPG、WEBP、最大 15MB",
    createButton: "封印リンクを作成",
    createHint: "最初に成功して開いた人だけが閲覧できます。未開封の秘密は 1 時間で期限切れになります。",
    resultLabel: "共有リンク",
    copyButton: "リンクをコピー",
    openLabel: "FlashSeal リンクを貼り付け",
    openInputPlaceholder: "https://flashseal.app/s/abc123#k=...",
    openButton: "シークレットを開く",
    viewerTitle: "シークレットを開きました",
    countdownLabel: "{seconds} 秒後に焼却",
    featureEncryptionTitle: "エンドツーエンド暗号化",
    featureEncryptionBody: "データは閲覧できません。鍵を持つのはあなたと受信者だけです。",
    featureOnceTitle: "一度だけアクセス",
    featureOnceBody: "最初の閲覧成功後、リンクはすぐに無効になります。",
    featureWindowTitle: "60 秒の閲覧時間",
    featureWindowBody: "開封後は 60 秒だけ内容が表示され、その後データは消去されます。",
    featureExpiryTitle: "1 時間で期限切れ",
    featureExpiryBody: "未開封の秘密は 60 分後に自動削除されます。",
    footerCopy: "© 2026 FlashSeal. プライバシー重視の設計。",
    pageTitle: "FlashSeal | 一度だけの秘密共有",
    pageDescription: "最初の成功した閲覧から 60 秒後に自動で焼却される暗号化テキスト・画像リンクを作成します。",
    creating: "秘密を暗号化して封印しています...",
    created: "FlashSeal リンクを作成しました。",
    copied: "リンクをクリップボードにコピーしました。",
    imageSelected: "画像の準備ができました。",
    emptyText: "作成する前にテキストを入力してください。",
    imageRequired: "作成する前に画像を選択してください。",
    imageTooLarge: "画像が 15MB の上限を超えています。",
    createFailed: "シークレットの作成に失敗しました。",
    openFailed: "シークレットを開けませんでした。",
    opening: "シークレットを開いています...",
    invalidLink: "この FlashSeal リンクは無効です。",
    missingKey: "このリンクには復号鍵がありません。",
    decryptFailed: "シークレットを復号できませんでした。",
    secretOpened: "このシークレットは既に開かれたか、焼却されました。",
    secretMissing: "このシークレットは存在しないか、期限切れです。",
    secretBurned: "このシークレットは焼却されました。",
    secretReady: "シークレットを開きました。",
    burnedNow: "このシークレットは焼却され、もう閲覧できません。"
  },
  ko: {
    languageShort: "한",
    languageName: "한국어",
    heroTitle: "비밀을 단 한 번만 공유하세요.",
    heroSubtitleLine1: "브라우저에서 암호화됩니다.",
    heroSubtitleLine2: "열람 후 자동으로 소각됩니다.",
    tabCreate: "시크릿 만들기",
    tabOpen: "시크릿 열기",
    kindText: "텍스트",
    kindImage: "이미지",
    textPlaceholder: "비밀 텍스트를 여기에 붙여넣으세요...",
    imagePickerTitle: "이미지 선택",
    imagePickerHelp: "PNG, JPG, WEBP, 최대 15MB",
    createButton: "봉인 링크 만들기",
    createHint: "처음으로 성공적으로 연 사람만 내용을 볼 수 있습니다. 열리지 않은 시크릿은 1시간 후 만료됩니다.",
    resultLabel: "공유 링크",
    copyButton: "링크 복사",
    openLabel: "FlashSeal 링크 붙여넣기",
    openInputPlaceholder: "https://flashseal.app/s/abc123#k=...",
    openButton: "시크릿 열기",
    viewerTitle: "시크릿이 열렸습니다",
    countdownLabel: "{seconds}초 후 소각",
    featureEncryptionTitle: "종단간 암호화",
    featureEncryptionBody: "우리는 데이터를 볼 수 없습니다. 키는 발신자와 수신자만 가집니다.",
    featureOnceTitle: "1회 접근",
    featureOnceBody: "첫 성공적인 열람 직후 링크는 즉시 무효화됩니다.",
    featureWindowTitle: "60초 열람 시간",
    featureWindowBody: "열린 뒤에는 60초 동안만 보이고 곧 데이터가 지워집니다.",
    featureExpiryTitle: "1시간 만료",
    featureExpiryBody: "열리지 않은 시크릿은 60분 후 자동으로 삭제됩니다.",
    footerCopy: "© 2026 FlashSeal. 프라이버시 우선 설계.",
    pageTitle: "FlashSeal | 한 번만 보는 비밀 공유",
    pageDescription: "첫 성공적인 열람 후 60초 뒤 자동으로 소각되는 암호화된 텍스트와 이미지 링크를 만드세요.",
    creating: "시크릿을 암호화하고 봉인하는 중...",
    created: "FlashSeal 링크가 준비되었습니다.",
    copied: "링크를 클립보드에 복사했습니다.",
    imageSelected: "이미지가 준비되었습니다.",
    emptyText: "시크릿을 만들기 전에 텍스트를 입력하세요.",
    imageRequired: "시크릿을 만들기 전에 이미지를 선택하세요.",
    imageTooLarge: "이미지가 15MB 제한을 초과했습니다.",
    createFailed: "시크릿 생성에 실패했습니다.",
    openFailed: "시크릿을 열 수 없습니다.",
    opening: "시크릿을 여는 중...",
    invalidLink: "이 FlashSeal 링크는 올바르지 않습니다.",
    missingKey: "이 링크에 복호화 키가 없습니다.",
    decryptFailed: "시크릿을 복호화할 수 없습니다.",
    secretOpened: "이 시크릿은 이미 열렸거나 소각되었습니다.",
    secretMissing: "이 시크릿이 없거나 만료되었습니다.",
    secretBurned: "이 시크릿은 소각되었습니다.",
    secretReady: "시크릿이 열렸습니다.",
    burnedNow: "이 시크릿은 소각되어 더 이상 볼 수 없습니다."
  }
};

const languageOrder = ["en", "zh", "ja", "ko"];

const state = {
  language: loadLanguage(),
  mode: "create",
  kind: "text",
  selectedImage: null,
  resultLink: "",
  countdownTimer: null,
  imageObjectUrl: null,
  viewerObjectUrl: null
};

const elements = {
  languageButton: document.querySelector("#language-button"),
  languageMenu: document.querySelector("#language-menu"),
  currentLanguage: document.querySelector("#current-language"),
  heroTitle: document.querySelector("#hero-title"),
  heroSubtitleLine1: document.querySelector("#hero-subtitle-line-1"),
  heroSubtitleLine2: document.querySelector("#hero-subtitle-line-2"),
  tabCreate: document.querySelector("#tab-create"),
  tabOpen: document.querySelector("#tab-open"),
  tabCreateLabel: document.querySelector("#tab-create-label"),
  tabOpenLabel: document.querySelector("#tab-open-label"),
  createPanel: document.querySelector("#create-panel"),
  openPanel: document.querySelector("#open-panel"),
  kindText: document.querySelector("#kind-text"),
  kindImage: document.querySelector("#kind-image"),
  kindTextLabel: document.querySelector("#kind-text-label"),
  kindImageLabel: document.querySelector("#kind-image-label"),
  textInput: document.querySelector("#secret-text"),
  textInputLabel: document.querySelector("#secret-text-label"),
  textComposer: document.querySelector("#text-composer"),
  imageComposer: document.querySelector("#image-composer"),
  imageInput: document.querySelector("#secret-image"),
  imagePicker: document.querySelector("#image-picker"),
  imagePickerLabel: document.querySelector("#image-picker-label"),
  imagePickerHelp: document.querySelector("#image-picker-help"),
  imagePreview: document.querySelector("#image-preview"),
  imagePreviewTag: document.querySelector("#image-preview-tag"),
  imageName: document.querySelector("#image-name"),
  imageSize: document.querySelector("#image-size"),
  createButton: document.querySelector("#create-button"),
  createHint: document.querySelector("#create-hint"),
  createStatus: document.querySelector("#create-status"),
  resultCard: document.querySelector("#result-card"),
  resultLabel: document.querySelector("#result-label"),
  resultLink: document.querySelector("#result-link"),
  copyButton: document.querySelector("#copy-button"),
  openLabel: document.querySelector("#open-label"),
  openInput: document.querySelector("#open-link"),
  openButton: document.querySelector("#open-button"),
  openStatus: document.querySelector("#open-status"),
  viewerCard: document.querySelector("#viewer-card"),
  viewerTitle: document.querySelector("#viewer-title"),
  countdownLabel: document.querySelector("#countdown-label"),
  countdownChip: document.querySelector("#countdown-chip"),
  viewerText: document.querySelector("#viewer-text"),
  viewerImageShell: document.querySelector("#viewer-image-shell"),
  viewerImage: document.querySelector("#viewer-image"),
  featureEncryptionTitle: document.querySelector("#feature-encryption-title"),
  featureEncryptionBody: document.querySelector("#feature-encryption-body"),
  featureOnceTitle: document.querySelector("#feature-once-title"),
  featureOnceBody: document.querySelector("#feature-once-body"),
  featureWindowTitle: document.querySelector("#feature-window-title"),
  featureWindowBody: document.querySelector("#feature-window-body"),
  featureExpiryTitle: document.querySelector("#feature-expiry-title"),
  featureExpiryBody: document.querySelector("#feature-expiry-body"),
  footerCopy: document.querySelector("#footer-copy")
};

boot();

function boot() {
  renderLanguageMenu();
  applyTranslations();
  bindEvents();
  syncFromLocation();
  registerServiceWorker();
}

function bindEvents() {
  elements.languageButton?.addEventListener("click", () => {
    elements.languageMenu.hidden = !elements.languageMenu.hidden;
  });

  document.addEventListener("click", (event) => {
    if (!elements.languageMenu.contains(event.target) && !elements.languageButton.contains(event.target)) {
      elements.languageMenu.hidden = true;
    }
  });

  elements.tabCreate?.addEventListener("click", () => setMode("create"));
  elements.tabOpen?.addEventListener("click", () => setMode("open"));
  elements.kindText?.addEventListener("click", () => setKind("text"));
  elements.kindImage?.addEventListener("click", () => setKind("image"));
  elements.imagePicker?.addEventListener("click", () => elements.imageInput?.click());
  elements.imageInput?.addEventListener("change", handleImageSelection);
  elements.createButton?.addEventListener("click", handleCreateSecret);
  elements.copyButton?.addEventListener("click", copyResultLink);
  elements.openButton?.addEventListener("click", handleOpenSecret);
  elements.openInput?.addEventListener("paste", handleOpenInputPaste);
  elements.openInput?.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleOpenSecret();
    }
  });
  window.addEventListener("hashchange", syncFromLocation);
  window.addEventListener("popstate", syncFromLocation);
}

function applyTranslations() {
  const t = getText();
  document.documentElement.lang = state.language;
  elements.currentLanguage.textContent = t.languageShort;
  elements.heroTitle.textContent = t.heroTitle;
  elements.heroSubtitleLine1.textContent = t.heroSubtitleLine1;
  elements.heroSubtitleLine2.textContent = t.heroSubtitleLine2;
  elements.tabCreateLabel.textContent = t.tabCreate;
  elements.tabOpenLabel.textContent = t.tabOpen;
  elements.kindTextLabel.textContent = t.kindText;
  elements.kindImageLabel.textContent = t.kindImage;
  elements.textInput.placeholder = t.textPlaceholder;
  elements.textInputLabel.textContent = t.textPlaceholder;
  elements.imagePickerLabel.textContent = t.imagePickerTitle;
  elements.imagePickerHelp.textContent = t.imagePickerHelp;
  elements.createButton.textContent = t.createButton;
  elements.createHint.textContent = t.createHint;
  elements.resultLabel.textContent = t.resultLabel;
  elements.copyButton.textContent = t.copyButton;
  elements.openLabel.textContent = t.openLabel;
  elements.openInput.placeholder = t.openInputPlaceholder;
  elements.openButton.textContent = t.openButton;
  elements.viewerTitle.textContent = t.viewerTitle;
  elements.countdownLabel.textContent = interpolate(t.countdownLabel, { seconds: String(elements.countdownChip.textContent || VIEW_DURATION_SECONDS) });
  elements.featureEncryptionTitle.textContent = t.featureEncryptionTitle;
  elements.featureEncryptionBody.textContent = t.featureEncryptionBody;
  elements.featureOnceTitle.textContent = t.featureOnceTitle;
  elements.featureOnceBody.textContent = t.featureOnceBody;
  elements.featureWindowTitle.textContent = t.featureWindowTitle;
  elements.featureWindowBody.textContent = t.featureWindowBody;
  elements.featureExpiryTitle.textContent = t.featureExpiryTitle;
  elements.featureExpiryBody.textContent = t.featureExpiryBody;
  elements.footerCopy.textContent = t.footerCopy;
  syncMeta(t);
}

function renderLanguageMenu() {
  elements.languageMenu.innerHTML = "";
  for (const language of languageOrder) {
    const t = translations[language];
    const button = document.createElement("button");
    button.type = "button";
    button.className = `lang-option${language === state.language ? " is-active" : ""}`;
    button.textContent = t.languageName;
    button.addEventListener("click", () => setLanguage(language));
    elements.languageMenu.append(button);
  }
}

function setLanguage(language) {
  state.language = language;
  localStorage.setItem("flashseal-language", language);
  elements.languageMenu.hidden = true;
  renderLanguageMenu();
  applyTranslations();
}

function setMode(mode) {
  state.mode = mode;
  elements.tabCreate.classList.toggle("is-active", mode === "create");
  elements.tabOpen.classList.toggle("is-active", mode === "open");
  elements.tabCreate.setAttribute("aria-selected", String(mode === "create"));
  elements.tabOpen.setAttribute("aria-selected", String(mode === "open"));
  elements.createPanel.hidden = mode !== "create";
  elements.openPanel.hidden = mode !== "open";
}

function setKind(kind) {
  state.kind = kind;
  elements.kindText.classList.toggle("is-active", kind === "text");
  elements.kindImage.classList.toggle("is-active", kind === "image");
  elements.kindText.setAttribute("aria-selected", String(kind === "text"));
  elements.kindImage.setAttribute("aria-selected", String(kind === "image"));
  elements.textComposer.hidden = kind !== "text";
  elements.imageComposer.hidden = kind !== "image";
}

async function handleCreateSecret() {
  const t = getText();
  clearStatus(elements.createStatus);
  hideResult();

  try {
    setStatus(elements.createStatus, t.creating);

    const secretPayload = await buildSecretPayload();
    if (!secretPayload) {
      return;
    }

    const id = randomId(SECRET_ID_LENGTH);
    const keyBytes = crypto.getRandomValues(new Uint8Array(32));
    const ivBytes = crypto.getRandomValues(new Uint8Array(12));
    const cryptoKey = await crypto.subtle.importKey("raw", keyBytes, "AES-GCM", false, ["encrypt"]);
    const encryptedBytes = await crypto.subtle.encrypt({ name: "AES-GCM", iv: ivBytes }, cryptoKey, secretPayload.bytes);

    const response = await fetch(`/api/secrets?lang=${state.language}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id,
        kind: secretPayload.kind,
        mimeType: secretPayload.mimeType,
        iv: base64UrlEncode(ivBytes),
        ciphertext: base64UrlEncode(new Uint8Array(encryptedBytes))
      })
    });

    const result = await response.json();
    if (!response.ok) {
      throw new Error(mapServerError(result?.code, t, "create"));
    }

    state.resultLink = `${window.location.origin}/s/${id}#k=${base64UrlEncode(keyBytes)}`;
    elements.resultLink.textContent = state.resultLink;
    elements.resultCard.hidden = false;
    setStatus(elements.createStatus, t.created, "success");
  } catch (error) {
    setStatus(elements.createStatus, error.message || t.createFailed, "error");
  }
}

async function buildSecretPayload() {
  const t = getText();
  if (state.kind === "text") {
    const value = elements.textInput.value.trim();
    if (!value) {
      setStatus(elements.createStatus, t.emptyText, "error");
      return null;
    }

    return {
      kind: "text",
      mimeType: "text/plain;charset=utf-8",
      bytes: new TextEncoder().encode(value)
    };
  }

  const file = state.selectedImage;
  if (!file) {
    setStatus(elements.createStatus, t.imageRequired, "error");
    return null;
  }

  if (file.size > MAX_IMAGE_BYTES) {
    setStatus(elements.createStatus, t.imageTooLarge, "error");
    return null;
  }

  return {
    kind: "image",
    mimeType: file.type || "application/octet-stream",
    bytes: new Uint8Array(await file.arrayBuffer())
  };
}

async function handleOpenSecret() {
  const t = getText();
  clearStatus(elements.openStatus);
  clearViewer();

  const parsed = parseSecretUrl(elements.openInput.value.trim());
  if (!parsed) {
    setStatus(elements.openStatus, t.invalidLink, "error");
    return;
  }

  if (!parsed.key) {
    setStatus(elements.openStatus, t.missingKey, "error");
    return;
  }

  try {
    setStatus(elements.openStatus, t.opening);
    const response = await fetch(`/api/secrets/${parsed.id}/open?lang=${state.language}`, {
      method: "POST"
    });
    const result = await readJsonResponse(response);

    if (!response.ok) {
      throw new Error(mapServerError(result?.code, t, "open"));
    }

    const keyBytes = base64UrlDecode(parsed.key);
    const ivBytes = base64UrlDecode(result.iv);
    const encryptedBytes = base64UrlDecode(result.ciphertext);
    const cryptoKey = await crypto.subtle.importKey("raw", keyBytes, "AES-GCM", false, ["decrypt"]);
    const plaintext = await crypto.subtle.decrypt({ name: "AES-GCM", iv: ivBytes }, cryptoKey, encryptedBytes);

    renderOpenedSecret(result.kind, result.mimeType, plaintext);
    setStatus(elements.openStatus, t.secretReady, "success");
    startBurnCountdown();
  } catch (error) {
    setStatus(elements.openStatus, error.message || t.decryptFailed, "error");
  }
}

function handleOpenInputPaste() {
  window.setTimeout(() => {
    const parsed = parseSecretUrl(elements.openInput.value.trim());
    if (parsed?.id && parsed?.key) {
      handleOpenSecret();
    }
  }, 0);
}

function renderOpenedSecret(kind, mimeType, plaintext) {
  const t = getText();
  elements.viewerCard.hidden = false;
  elements.viewerTitle.textContent = t.viewerTitle;
  elements.countdownChip.textContent = String(VIEW_DURATION_SECONDS);
  elements.countdownLabel.textContent = interpolate(t.countdownLabel, { seconds: String(VIEW_DURATION_SECONDS) });

  if (kind === "text") {
    elements.viewerText.hidden = false;
    elements.viewerImageShell.hidden = true;
    elements.viewerText.textContent = new TextDecoder().decode(plaintext);
    return;
  }

  elements.viewerText.hidden = true;
  elements.viewerImageShell.hidden = false;
  const blob = new Blob([plaintext], { type: mimeType || "application/octet-stream" });
  releaseViewerObjectUrl();
  state.viewerObjectUrl = URL.createObjectURL(blob);
  elements.viewerImage.src = state.viewerObjectUrl;
}

function startBurnCountdown() {
  stopBurnCountdown();
  let remaining = VIEW_DURATION_SECONDS;
  const t = getText();
  elements.countdownChip.textContent = String(remaining);
  elements.countdownLabel.textContent = interpolate(t.countdownLabel, { seconds: String(remaining) });

  state.countdownTimer = window.setInterval(() => {
    remaining -= 1;

    if (remaining <= 0) {
      stopBurnCountdown();
      clearViewer();
      setStatus(elements.openStatus, getText().burnedNow, "error");
      return;
    }

    elements.countdownChip.textContent = String(remaining);
    elements.countdownLabel.textContent = interpolate(getText().countdownLabel, { seconds: String(remaining) });
  }, 1000);
}

function stopBurnCountdown() {
  if (state.countdownTimer) {
    clearInterval(state.countdownTimer);
    state.countdownTimer = null;
  }
}

async function copyResultLink() {
  if (!state.resultLink) {
    return;
  }

  await navigator.clipboard.writeText(state.resultLink);
  setStatus(elements.createStatus, getText().copied, "success");
}

function handleImageSelection(event) {
  const file = event.target.files?.[0];
  if (!file) {
    return;
  }

  if (file.size > MAX_IMAGE_BYTES) {
    setStatus(elements.createStatus, getText().imageTooLarge, "error");
    event.target.value = "";
    return;
  }

  state.selectedImage = file;
  elements.imageName.textContent = file.name;
  elements.imageSize.textContent = formatBytes(file.size);
  releasePreviewObjectUrl();
  state.imageObjectUrl = URL.createObjectURL(file);
  elements.imagePreviewTag.src = state.imageObjectUrl;
  elements.imagePreview.hidden = false;
  setStatus(elements.createStatus, getText().imageSelected, "success");
}

function clearViewer() {
  stopBurnCountdown();
  elements.viewerCard.hidden = true;
  elements.viewerText.hidden = true;
  elements.viewerText.textContent = "";
  elements.viewerImageShell.hidden = true;
  elements.viewerImage.removeAttribute("src");
  releaseViewerObjectUrl();
}

function hideResult() {
  state.resultLink = "";
  elements.resultCard.hidden = true;
  elements.resultLink.textContent = "";
}

function syncFromLocation() {
  const pathMatch = window.location.pathname.match(/^\/s\/([^/]+)$/);
  if (pathMatch) {
    setMode("open");
    elements.openInput.value = window.location.href;
    handleOpenSecret();
  }
}

function parseSecretUrl(value) {
  try {
    const url = new URL(value || window.location.href, window.location.origin);
    const pathMatch = url.pathname.match(/^\/s\/([^/]+)$/);
    if (!pathMatch) {
      return null;
    }

    const hash = new URLSearchParams(url.hash.slice(1));
    return {
      id: pathMatch[1],
      key: hash.get("k")
    };
  } catch {
    return null;
  }
}

async function readJsonResponse(response) {
  const contentType = response.headers.get("content-type") || "";
  const text = await response.text();

  if (!contentType.includes("application/json")) {
    throw new Error(getText().openFailed);
  }

  try {
    return JSON.parse(text);
  } catch {
    throw new Error(getText().openFailed);
  }
}

function syncMeta(t) {
  document.title = t.pageTitle;
  setMeta("name", "description", t.pageDescription);
  setMeta("property", "og:title", t.pageTitle);
  setMeta("property", "og:description", t.pageDescription);
  setMeta("property", "twitter:title", t.pageTitle);
  setMeta("property", "twitter:description", t.pageDescription);
}

function setMeta(attribute, value, content) {
  const selector = `meta[${attribute}="${value}"]`;
  const element = document.querySelector(selector);
  if (element) {
    element.setAttribute("content", content);
  }
}

function setStatus(node, message, kind) {
  node.textContent = message;
  node.classList.remove("is-error", "is-success");
  if (kind === "error") {
    node.classList.add("is-error");
  }
  if (kind === "success") {
    node.classList.add("is-success");
  }
}

function clearStatus(node) {
  node.textContent = "";
  node.classList.remove("is-error", "is-success");
}

function mapServerError(code, t, source) {
  if (code === "secret_opened") {
    return t.secretOpened;
  }
  if (code === "secret_missing") {
    return t.secretMissing;
  }
  if (code === "payload_too_large") {
    return t.imageTooLarge;
  }
  return source === "open" ? t.openFailed : t.createFailed;
}

function randomId(length) {
  const bytes = crypto.getRandomValues(new Uint8Array(length));
  let value = "";
  for (let index = 0; index < length; index += 1) {
    value += SECRET_ID_ALPHABET[bytes[index] % SECRET_ID_ALPHABET.length];
  }
  return value;
}

function base64UrlEncode(bytes) {
  let binary = "";
  for (const byte of bytes) {
    binary += String.fromCharCode(byte);
  }
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

function base64UrlDecode(value) {
  const padded = value.replace(/-/g, "+").replace(/_/g, "/").padEnd(Math.ceil(value.length / 4) * 4, "=");
  const binary = atob(padded);
  const bytes = new Uint8Array(binary.length);
  for (let index = 0; index < binary.length; index += 1) {
    bytes[index] = binary.charCodeAt(index);
  }
  return bytes;
}

function interpolate(template, values) {
  return template.replace(/\{(\w+)\}/g, (_, key) => values[key] ?? "");
}

function getText() {
  return translations[state.language] || translations[DEFAULT_LANGUAGE];
}

function loadLanguage() {
  const stored = localStorage.getItem("flashseal-language");
  if (stored && translations[stored]) {
    return stored;
  }

  const detected = navigator.language.toLowerCase();
  if (detected.startsWith("zh")) {
    return "zh";
  }
  if (detected.startsWith("ja")) {
    return "ja";
  }
  if (detected.startsWith("ko")) {
    return "ko";
  }
  return DEFAULT_LANGUAGE;
}

function releasePreviewObjectUrl() {
  if (state.imageObjectUrl) {
    URL.revokeObjectURL(state.imageObjectUrl);
    state.imageObjectUrl = null;
  }
}

function releaseViewerObjectUrl() {
  if (state.viewerObjectUrl) {
    URL.revokeObjectURL(state.viewerObjectUrl);
    state.viewerObjectUrl = null;
  }
}

function formatBytes(size) {
  if (size < 1024 * 1024) {
    return `${Math.round(size / 1024)} KB`;
  }
  return `${(size / (1024 * 1024)).toFixed(2)} MB`;
}

function registerServiceWorker() {
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker.register("/sw.js").catch(() => {});
    });
  }
}
