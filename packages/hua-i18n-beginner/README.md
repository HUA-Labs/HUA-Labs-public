# @hua-labs/i18n-beginner

Beginner-friendly i18n SDK for React. Simple setup, no complexity.
珥덈낫?먮? ?꾪븳 React i18n SDK. 媛꾨떒???ㅼ젙, 蹂듭옟???놁쓬.

[![npm version](https://img.shields.io/npm/v/@hua-labs/i18n-beginner.svg)](https://www.npmjs.com/package/@hua-labs/i18n-beginner)
[![npm downloads](https://img.shields.io/npm/dm/@hua-labs/i18n-beginner.svg)](https://www.npmjs.com/package/@hua-labs/i18n-beginner)
[![license](https://img.shields.io/npm/l/@hua-labs/i18n-beginner.svg)](https://github.com/HUA-Labs/HUA-Labs-public/blob/main/LICENSE)
[![React](https://img.shields.io/badge/React-16.8%2B-blue)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue.svg)](https://www.typescriptlang.org/)

> **?좑툘 Alpha Release**: This package is currently in alpha. APIs may change before the stable release.

---

[?쒓뎅??(#korean) | [English](./README_EN.md)

## ??SDK??珥덈낫?먯슜?낅땲??

> ?곕え 蹂닿린 | 湲곗뿬??[SDK ?덊룷](https://github.com/HUA-Labs/HUA-Labs-public)?먯꽌

> 怨좉툒 湲곕뒫???꾩슂?섏떆?ㅻ㈃?  
> - **珥덈낫?먯슜**: `@hua-labs/i18n-beginner` (?꾩옱 ?⑦궎吏) - 媛꾨떒?섍퀬 吏곴???
> - **怨좉툒?먯슜**: `@hua-labs/i18n-sdk` - ?꾩쟾??湲곕뒫, ?뚮윭洹몄씤, 怨좉툒 ?ㅼ젙
> - **?꾨Ц媛??*: `@hua-labs/i18n-advanced` - 而ㅼ뒪? 濡쒕뜑, ?깅뒫 理쒖쟻?? ?뷀꽣?꾨씪?댁쫰 湲곕뒫

**??SDK??"30珥?留뚯뿉 ?쒖옉"??紐⑺몴濡?留뚮뱾?댁죱?듬땲??**

---

## English

**The simplest internationalization SDK for React beginners!**

A beginner-friendly i18n SDK that supports Korean and English out of the box, with easy support for additional languages.

### Features
- **Zero Configuration**: Works out of the box with Korean and English
- **Easy Language Addition**: Add any language with simple functions
- **TypeScript Support**: Full type safety and IntelliSense
- **Next.js Compatible**: Works perfectly with App Router and Pages Router
- **No External Dependencies**: Lightweight and fast
- **80+ Built-in Translations**: Common UI elements pre-translated

### Quick Start (30 seconds)
```bash
npm install @hua-labs/i18n-beginner
```

```tsx
// app/layout.tsx
import { SimpleI18n } from '@hua-labs/i18n-beginner';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <SimpleI18n>
          {children}
        </SimpleI18n>
      </body>
    </html>
  );
}
```

```tsx
// app/page.tsx
'use client';
import { useSimpleI18n } from '@hua-labs/i18n-beginner';

export default function Home() {
  const { t, toggleLanguage, languageButtonText } = useSimpleI18n();

  return (
    <div>
      <h1>{t('welcome')}</h1>
      <p>{t('hello')}</p>
      <button onClick={toggleLanguage}>{languageButtonText}</button>
    </div>
  );
}
```

### Adding Other Languages
```tsx
// Add Japanese
useEffect(() => {
  addTranslation('ja', 'welcome', '?덀걝?볝걹');
  addTranslation('ja', 'hello', '?볝굯?ャ걾??);
}, []);

// Or use TypeScript files
const japaneseTranslations = {
  ja: {
    welcome: "?덀걝?볝걹",
    hello: "?볝굯?ャ걾??
  }
} as const;

useTranslationsFromFile(japaneseTranslations);
```

---

## Korean

**React 珥덈낫?먮? ?꾪븳 媛??媛꾨떒???ㅺ뎅??吏??SDK!**

?쒓뎅?댁? ?곸뼱瑜?湲곕낯?쇰줈 吏?먰븯硫? ?ㅻⅨ ?몄뼱???쎄쾶 異붽??????덈뒗 珥덈낫??移쒗솕?곸씤 i18n SDK?낅땲??

### ?뱀쭠
- **?ㅼ젙 遺덊븘??*: ?쒓뎅???곸뼱 利됱떆 ?ъ슜 媛??
- **?몄뼱 異붽? ?ъ?**: 媛꾨떒???⑥닔濡??대뼡 ?몄뼱??異붽?
- **TypeScript 吏??*: ?꾩쟾??????덉젙?깃낵 ?먮룞?꾩꽦
- **Next.js ?명솚**: App Router? Pages Router ?꾨꼍 吏??
- **?몃? ?섏〈???놁쓬**: 媛蹂띻퀬 鍮좊쫫
- **80媛? 湲곕낯 踰덉뿭**: ?쇰컲?곸씤 UI ?붿냼 誘몃━ 踰덉뿭??

### 30珥?留뚯뿉 ?쒖옉?섍린

#### 1?④퀎: ?ㅼ튂?섍린
```bash
npm install @hua-labs/i18n-beginner
```

#### 2?④퀎: ?ㅼ젙?섍린
```tsx
// app/layout.tsx (?먮뒗 pages/_app.tsx)
import { SimpleI18n } from '@hua-labs/i18n-beginner';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <SimpleI18n>
          {children}
        </SimpleI18n>
      </body>
    </html>
  );
}
```

#### 3?④퀎: ?ъ슜?섍린
```tsx
// app/components/MyComponent.tsx
import { useSimpleI18n } from '@hua-labs/i18n-beginner';

export default function MyComponent() {
  const { t, toggleLanguage, languageButtonText } = useSimpleI18n();

  return (
    <div>
      <h1>{t('welcome')}</h1>
      <p>{t('hello')}</p>
      <button onClick={toggleLanguage}>{languageButtonText}</button>
    </div>
  );
}
```

#### 4?④퀎: TypeScript ?뚯씪濡?踰덉뿭 遺꾨━?섍린 (?좏깮?ы빆)
```tsx
// translations/myTranslations.ts
export const myTranslations = {
  ko: {
    welcome_message: "?섏쁺?⑸땲??,
    goodbye_message: "?덈뀞??媛?몄슂"
  },
  en: {
    welcome_message: "Welcome",
    goodbye_message: "Goodbye"
  }
} as const;

// app/components/MyComponent.tsx
import { useSimpleI18n, useTranslationsFromFile } from '@hua-labs/i18n-beginner';
import { myTranslations } from '../translations/myTranslations';

export default function MyComponent() {
  const { t, toggleLanguage, languageButtonText } = useSimpleI18n();
  
  // TypeScript ?뚯씪?먯꽌 踰덉뿭 ?먮룞 濡쒕뱶
  useTranslationsFromFile(myTranslations);

  return (
    <div>
      <h1>{t('welcome')}</h1>
      <p>{t('welcome_message')}</p> {/* TypeScript ?뚯씪?먯꽌 濡쒕뱶??踰덉뿭 */}
      <button onClick={toggleLanguage}>{languageButtonText}</button>
    </div>
  );
}
```

**??** ?댁젣 ?쒓뎅???곸뼱 ?먮룞 ?꾪솚???꾩꽦?섏뿀?듬땲??

---

## ?ㅺ뎅??吏???덈궡

### ?꾩옱 吏???몄뼱
- **?쒓뎅??(ko)**: 湲곕낯 吏??
- **?곸뼱 (en)**: 湲곕낯 吏??

### ?ㅻⅨ ?몄뼱 異붽??섍린

?꾩옱 SDK???쒓뎅?댁? ?곸뼱留?湲곕낯?쇰줈 吏?먰븯吏留? ?ㅻⅨ ?몄뼱???쎄쾶 異붽??????덉뒿?덈떎!

#### 諛⑸쾿 1: ?숈쟻?쇰줈 ?몄뼱 異붽??섍린
```tsx
import { useSimpleI18n } from '@hua-labs/i18n-beginner';

function MyComponent() {
  const { addTranslation } = useSimpleI18n();
  
  // ?쇰낯??異붽?
  useEffect(() => {
    addTranslation('ja', 'welcome', '?덀걝?볝걹');
    addTranslation('ja', 'hello', '?볝굯?ャ걾??);
    addTranslation('ja', 'goodbye', '?뺛굠?녴겒??);
  }, []);
  
  return <div>{t('welcome')}</div>;
}
```

#### 諛⑸쾿 2: TypeScript ?뚯씪濡??몄뼱 異붽??섍린
```tsx
// translations/japanese.ts
export const japaneseTranslations = {
  ja: {
    welcome: "?덀걝?볝걹",
    hello: "?볝굯?ャ걾??,
    goodbye: "?뺛굠?녴겒??,
    email: "?▲꺖?ャ궋?됥꺃??,
    password: "?묆궧??꺖??,
    submit: "?곦에"
  }
} as const;

// 而댄룷?뚰듃?먯꽌 ?ъ슜
import { useTranslationsFromFile } from '@hua-labs/i18n-beginner';
import { japaneseTranslations } from './translations/japanese';

function MyComponent() {
  const { t } = useSimpleI18n();
  useTranslationsFromFile(japaneseTranslations);
  
  return <div>{t('welcome')}</div>;
}
```

#### 諛⑸쾿 3: ?몄뼱蹂??뚯씪濡?遺꾨━?섍린
```tsx
// translations/spanish.ts
export const spanishTranslations = {
  es: {
    welcome: "Bienvenido",
    hello: "Hola",
    goodbye: "Adi처s"
  }
} as const;

// translations/french.ts
export const frenchTranslations = {
  fr: {
    welcome: "Bienvenue",
    hello: "Bonjour",
    goodbye: "Au revoir"
  }
} as const;

// translations/german.ts
export const germanTranslations = {
  de: {
    welcome: "Willkommen",
    hello: "Hallo",
    goodbye: "Auf Wiedersehen"
  }
} as const;
```

### ?몄뼱 肄붾뱶 李멸퀬

| ?몄뼱 | 肄붾뱶 | ?덉떆 |
|------|------|------|
| ?쒓뎅??| `ko` | ?덈뀞?섏꽭??|
| ?곸뼱 | `en` | Hello |
| ?쇰낯??| `ja` | ?볝굯?ャ걾??|
| 以묎뎅??(媛꾩껜) | `zh-CN` | 鵝졾? |
| 以묎뎅??(踰덉껜) | `zh-TW` | 鵝졾? |
| ?ㅽ럹?몄뼱 | `es` | Hola |
| ?꾨옉?ㅼ뼱 | `fr` | Bonjour |
| ?낆씪??| `de` | Hallo |
| ?댄깉由ъ븘??| `it` | Ciao |
| ?щⅤ?ш컝??| `pt` | Ol찼 |
| ?ъ떆?꾩뼱 | `ru` | ??龜勻筠? |
| ?꾨엻??| `ar` | ?邈幕磨碼 |

### ?몄뼱 ?꾪솚 湲곕뒫 ?뺤옣?섍린

?щ윭 ?몄뼱瑜?吏?먰븯?ㅻ㈃ ?몄뼱 ?좏깮 UI瑜?留뚮뱾?대낫?몄슂:

```tsx
function LanguageSelector() {
  const { setLanguage, language } = useSimpleI18n();
  
  const languages = [
    { code: 'ko', name: '?쒓뎅??, flag: '?눖?눟' },
    { code: 'en', name: 'English', flag: '?눣?눡' },
    { code: 'ja', name: '?ζ쑍沃?, flag: '?눓?눝' },
    { code: 'es', name: 'Espa챰ol', flag: '?눎?눡' },
    { code: 'fr', name: 'Fran챌ais', flag: '?눏?눟' }
  ];
  
  return (
    <select 
      value={language} 
      onChange={(e) => setLanguage(e.target.value)}
    >
      {languages.map(lang => (
        <option key={lang.code} value={lang.code}>
          {lang.flag} {lang.name}
        </option>
      ))}
    </select>
  );
}
```

### ?뱷 湲곗뿬?섍린

??留롮? ?몄뼱瑜?湲곕낯?쇰줈 吏?먰븯怨??띕떎硫?

1. **GitHub Issues**???몄뼱 異붽? ?붿껌
2. **Pull Request**濡?踰덉뿭 ?뚯씪 ?쒖텧
3. **而ㅻ??덊떚 湲곗뿬**濡?SDK 諛쒖쟾??李몄뿬

> ?? ?몄뼱蹂?踰덉뿭 ?뚯씪??留뚮뱾?댁꽌 怨듭쑀?섎㈃ ?ㅻⅨ 媛쒕컻?먮뱾???쎄쾶 ?ъ슜?????덉뼱??

---

## ?뱥 ?꾩쟾 珥덈낫?먯슜 泥댄겕由ъ뒪??

### 1?④퀎: ?ㅼ튂 ?뺤씤
```bash
# ?곕??먯뿉????紐낅졊?대? ?ㅽ뻾?덈굹??
npm install @hua-labs/i18n-beginner
```
> ??**?뺤씤 諛⑸쾿**: `package.json` ?뚯씪??`"@hua-labs/i18n-beginner"`媛 ?덈뒗吏 ?뺤씤?섏꽭??

### 2?④퀎: Provider ?ㅼ젙 ?뺤씤
```tsx
// ??肄붾뱶媛 layout.tsx???덈굹??
import { SimpleI18n } from '@hua-labs/i18n-beginner';

<SimpleI18n>
  {children}
</SimpleI18n>
```
> ??**?뺤씤 諛⑸쾿**: ?섏씠吏媛 濡쒕뱶?????ㅻ쪟媛 ?녿떎硫??깃났?댁뿉??

### 3?④퀎: 而댄룷?뚰듃?먯꽌 ?ъ슜 ?뺤씤
```tsx
// ??肄붾뱶媛 而댄룷?뚰듃???덈굹??
import { useSimpleI18n } from '@hua-labs/i18n-beginner';

const { t, toggleLanguage, languageButtonText } = useSimpleI18n();
```
> ??**?뺤씤 諛⑸쾿**: 踰꾪듉???대┃?덉쓣 ???몄뼱媛 諛붾뚮굹??

---

## ?㎦ ?ㅼ젣 ?뚯뒪??寃곌낵

### ?뚯뒪???꾨즺 ??ぉ??
- [x] ?쒓뎅?????곸뼱 ?꾪솚
- [x] ?곸뼱 ???쒓뎅???꾪솚  
- [x] ?섏씠吏 ?덈줈怨좎묠 ???몄뼱 ?좎?
- [x] 湲곕낯 踰덉뿭 ?ㅻ뱾 ?뺤긽 ?묐룞
- [x] 而ㅼ뒪? 踰덉뿭 異붽? 湲곕뒫
- [x] TypeScript ?뚯씪 踰덉뿭 濡쒕뱶
- [x] ?섏씠?쒕젅?댁뀡 ?ㅻ쪟 ?놁쓬
- [x] 臾댄븳 猷⑦봽 ?ㅻ쪟 ?놁쓬

### ?뚯뒪???섍꼍:
- **?꾨젅?꾩썙??*: Next.js 15
- **?몄뼱**: ?쒓뎅?? ?곸뼱, TypeScript ?뚯씪 踰덉뿭
- **釉뚮씪?곗?**: Chrome, Firefox, Safari
- **湲곌린**: ?곗뒪?ы넲, 紐⑤컮??

---

## 湲곕낯 ?쒓났 踰덉뿭 ?ㅻ뱾

### 湲곕낯 ?몄궗留?
```tsx
t('welcome')     // "?섏쁺?⑸땲?? / "Welcome"
t('hello')       // "?덈뀞?섏꽭?? / "Hello"
t('click_me')    // "?대┃?섏꽭?? / "Click me"
```

### ?곹깭 硫붿떆吏
```tsx
t('loading')     // "濡쒕뵫 以?.." / "Loading..."
t('error')       // "?ㅻ쪟媛 諛쒖깮?덉뒿?덈떎" / "An error occurred"
t('success')     // "?깃났?덉뒿?덈떎" / "Success"
```

### ?럾截?踰꾪듉 ?띿뒪??
```tsx
t('cancel')      // "痍⑥냼" / "Cancel"
t('confirm')     // "?뺤씤" / "Confirm"
t('save')        // "??? / "Save"
t('delete')      // "??젣" / "Delete"
t('edit')        // "?몄쭛" / "Edit"
t('add')         // "異붽?" / "Add"
```

### ?뵇 寃??諛??ㅻ퉬寃뚯씠??
```tsx
t('search')      // "寃?? / "Search"
t('back')        // "?ㅻ줈" / "Back"
t('next')        // "?ㅼ쓬" / "Next"
t('home')        // "?? / "Home"
t('about')       // "?뚭컻" / "About"
t('contact')     // "?곕씫泥? / "Contact"
```

### ?숋툘 ?ㅼ젙 諛??ъ슜??
```tsx
t('settings')    // "?ㅼ젙" / "Settings"
t('profile')     // "?꾨줈?? / "Profile"
t('logout')      // "濡쒓렇?꾩썐" / "Logout"
t('login')       // "濡쒓렇?? / "Login"
t('register')    // "?뚯썝媛?? / "Register"
```

### ?뱷 ???꾨뱶
```tsx
t('email')       // "?대찓?? / "Email"
t('password')    // "鍮꾨?踰덊샇" / "Password"
t('name')        // "?대쫫" / "Name"
t('phone')       // "?꾪솕踰덊샇" / "Phone"
t('address')     // "二쇱냼" / "Address"
```

### ?≪뀡 踰꾪듉
```tsx
t('submit')      // "?쒖텧" / "Submit"
t('reset')       // "珥덇린?? / "Reset"
t('close')       // "?リ린" / "Close"
t('open')        // "?닿린" / "Open"
t('yes')         // "?? / "Yes"
t('no')          // "?꾨땲?? / "No"
t('ok')          // "?뺤씤" / "OK"
```

### 湲?硫붿떆吏
```tsx
t('loading_text')        // "?좎떆留?湲곕떎?ㅼ＜?몄슂..." / "Please wait..."
t('error_message')       // "臾몄젣媛 諛쒖깮?덉뒿?덈떎. ?ㅼ떆 ?쒕룄?댁＜?몄슂." / "An error occurred. Please try again."
t('success_message')     // "?깃났?곸쑝濡??꾨즺?섏뿀?듬땲??" / "Successfully completed!"
t('not_found')          // "李얠쓣 ???놁뒿?덈떎" / "Not found"
t('unauthorized')       // "沅뚰븳???놁뒿?덈떎" / "Unauthorized"
t('forbidden')          // "?묎렐??嫄곕??섏뿀?듬땲?? / "Forbidden"
t('server_error')       // "?쒕쾭 ?ㅻ쪟媛 諛쒖깮?덉뒿?덈떎" / "Server error occurred"
```

> ?ъ슜 ??  
> ???ㅻ뱾??洹몃?濡?蹂듭궗?댁꽌 `t('?ㅼ씠由?)` ?뺥깭濡??ъ슜?섏꽭??  
> ?? `t('welcome')` ??"?섏쁺?⑸땲?? ?먮뒗 "Welcome"

---

## ?뱷 而ㅼ뒪? 踰덉뿭 異붽??섍린

湲곕낯 踰덉뿭 ?몄뿉 異붽? 踰덉뿭???꾩슂?섎떎硫??щ윭 媛吏 諛⑸쾿???덉뼱??

### 諛⑸쾿 1: ?숈쟻?쇰줈 踰덉뿭 異붽??섍린
```tsx
import { useSimpleI18n } from '@hua-labs/i18n-beginner';

function MyComponent() {
  const { t, toggleLanguage, languageButtonText, addTranslation } = useSimpleI18n();
  
  // 踰덉뿭 異붽??섍린
  const addCustomTranslations = () => {
    addTranslation('ko', 'custom_message', '而ㅼ뒪? 硫붿떆吏');
    addTranslation('en', 'custom_message', 'Custom message');
  };
  
  return (
    <div>
      <h1>{t('welcome')}</h1>
      <p>{t('hello')}</p>
      <p>{t('custom_message')}</p> {/* 而ㅼ뒪? 踰덉뿭 ?ъ슜 */}
      <button onClick={addCustomTranslations}>踰덉뿭 異붽?</button>
      <button onClick={toggleLanguage}>{languageButtonText}</button>
    </div>
  );
}
```

### ?뱚 諛⑸쾿 2: TypeScript ?뚯씪濡?踰덉뿭 遺꾨━?섍린 (異붿쿇!)

**1?④퀎: 踰덉뿭 ?뚯씪 留뚮뱾湲?*
```tsx
// translations/myTranslations.ts
export const myTranslations = {
  ko: {
    welcome_message: "?섏쁺?⑸땲??,
    goodbye_message: "?덈뀞??媛?몄슂",
    custom_button: "而ㅼ뒪? 踰꾪듉",
    about_us: "?곕━?????,
    contact_info: "?곕씫泥??뺣낫"
  },
  en: {
    welcome_message: "Welcome",
    goodbye_message: "Goodbye", 
    custom_button: "Custom Button",
    about_us: "About Us",
    contact_info: "Contact Information"
  }
} as const;
```

**2?④퀎: 而댄룷?뚰듃?먯꽌 ?ъ슜?섍린**
```tsx
import { useSimpleI18n, loadTranslationsFromFile } from '@hua-labs/i18n-beginner';
import { myTranslations } from './translations/myTranslations';

function MyComponent() {
  const { t, addTranslation } = useSimpleI18n();
  
  // 而댄룷?뚰듃 留덉슫????踰덉뿭 ?뚯씪 濡쒕뱶
  useEffect(() => {
    loadTranslationsFromFile(myTranslations, addTranslation);
  }, []);
  
  return (
    <div>
      <h1>{t('welcome_message')}</h1>
      <p>{t('about_us')}</p>
      <button>{t('custom_button')}</button>
    </div>
  );
}
```

### 諛⑸쾿 3: ??媛꾨떒?????ъ슜?섍린
```tsx
import { useSimpleI18n, useTranslationsFromFile } from '@hua-labs/i18n-beginner';
import { myTranslations } from './translations/myTranslations';

function MyComponent() {
  const { t } = useSimpleI18n();
  
  // ?먮룞?쇰줈 踰덉뿭 ?뚯씪 濡쒕뱶
  useTranslationsFromFile(myTranslations);
  
  return (
    <div>
      <h1>{t('welcome_message')}</h1>
      <p>{t('contact_info')}</p>
    </div>
  );
}
```

> ?닿쾶 萸붽???  
> - **TypeScript ?뚯씪**: 踰덉뿭??蹂꾨룄 ?뚯씪濡?愿由ы븷 ???덉뼱??
> - **`loadTranslationsFromFile`**: 踰덉뿭 ?뚯씪???먮룞?쇰줈 濡쒕뱶?댁슂
> - **`useTranslationsFromFile`**: ??媛꾨떒?섍쾶 ?ъ슜?????덈뒗 ?낆씠?먯슂

### 踰덉뿭 異붽? 洹쒖튃

- **?몄뼱 肄붾뱶**: `ko` (?쒓뎅??, `en` (?곸뼱)
- **??*: 臾몄옄??(?? `'my_text'`)
- **媛?*: 臾몄옄??(?? `'???띿뒪??`)
- **?숈쟻 異붽?**: `addTranslation(?몄뼱, ?? 媛?`

> 異붿쿇?섎뒗 諛⑸쾿:  
> - **珥덈낫??*: TypeScript ?뚯씪濡?踰덉뿭 遺꾨━?섍린
> - **媛꾨떒??寃쎌슦**: ?숈쟻?쇰줈 踰덉뿭 異붽??섍린
> - **蹂듭옟???꾨줈?앺듃**: ?щ윭 踰덉뿭 ?뚯씪濡??섎늻湲?

> 二쇱쓽?ы빆:  
> - ?ㅻ뒗 ?곗샂?쒕줈 媛먯떥???댁슂: `'my_text'` (O), `my_text` (X)
> - 媛믩룄 ?곗샂?쒕줈 媛먯떥???댁슂: `'???띿뒪??` (O), `???띿뒪?? (X)
> - TypeScript ?뚯씪 ?ъ슜 ??`as const`瑜?遺숈씠硫?????덉젙?깆씠 ?μ긽?쇱슂!

?대젃寃??섎㈃ 踰덉뿭??泥닿퀎?곸쑝濡?愿由ы븷 ???덉뒿?덈떎!

---

## 怨좉툒 ?ъ슜踰?

### ?ㅼ뼇???낅뱾

#### 1. `useSimpleI18n` (異붿쿇!)
```tsx
const { t, toggleLanguage, languageButtonText, isClient, addTranslation } = useSimpleI18n();
```
> ?몄젣 ?ъ슜? ?遺遺꾩쓽 寃쎌슦???ъ슜?섏꽭?? 媛??媛꾨떒?댁슂!

#### 2. `useTranslate` (踰덉뿭留??꾩슂????
```tsx
const t = useTranslate();
```
> ?몄젣 ?ъ슜? 踰덉뿭 ?⑥닔留??꾩슂?????ъ슜?섏꽭??

#### 3. `useLanguage` (?몄뼱 愿??湲곕뒫留??꾩슂????
```tsx
const { language, setLanguage, toggleLanguage, addTranslation } = useLanguage();
```
> ?몄젣 ?ъ슜? ?몄뼱 蹂寃?湲곕뒫留??꾩슂?????ъ슜?섏꽭??

#### 4. `useI18n` (紐⑤뱺 湲곕뒫???꾩슂????
```tsx
const { t, language, setLanguage, toggleLanguage, addTranslation, isClient } = useI18n();
```
> ?몄젣 ?ъ슜? 紐⑤뱺 湲곕뒫???꾩슂?????ъ슜?섏꽭??

### ?몄뼱 吏곸젒 ?ㅼ젙?섍린

```tsx
import { useLanguage } from '@hua-labs/i18n-beginner';

function LanguageSelector() {
  const { setLanguage } = useLanguage();
  
  return (
    <div>
      <button onClick={() => setLanguage('ko')}>?쒓뎅??/button>
      <button onClick={() => setLanguage('en')}>English</button>
    </div>
  );
}
```

> ?닿쾶 萸붽???  
> `toggleLanguage()`???쒓뎅?????곸뼱瑜?踰덇컝?꾧?硫?諛붽씀怨?  
> `setLanguage('ko')`??臾댁“嫄??쒓뎅?대줈, `setLanguage('en')`? 臾댁“嫄??곸뼱濡?諛붽퓭??

---

## 二쇱쓽?ы빆

### ?섏씠?쒕젅?댁뀡 臾몄젣 ?닿껐

Next.js?먯꽌 "hydration mismatch" ?ㅻ쪟媛 諛쒖깮?????덉뼱?? ?대젃寃??닿껐?섏꽭??

```tsx
import { useSimpleI18n } from '@hua-labs/i18n-beginner';

function MyComponent() {
  const { t, toggleLanguage, languageButtonText, isClient } = useSimpleI18n();

  // ?섏씠?쒕젅?댁뀡 諛⑹?
  if (!isClient) {
    return (
      <div>
        <h1>?섏쁺?⑸땲??/h1>
        <p>?덈뀞?섏꽭??/p>
        <button>English</button>
      </div>
    );
  }

  return (
    <div>
      <h1>{t('welcome')}</h1>
      <p>{t('hello')}</p>
      <button onClick={toggleLanguage}>{languageButtonText}</button>
    </div>
  );
}
```

> ?닿쾶 萸붽???  
> - `isClient`: 釉뚮씪?곗??먯꽌 ?ㅽ뻾 以묒씤吏 ?뺤씤?섎뒗 ?뚮옒洹?
> - `!isClient`: ?쒕쾭?먯꽌 ?ㅽ뻾 以묒씪 ?뚮뒗 怨좎젙???쒓뎅???띿뒪?몃? 蹂댁뿬以?
> - ?대젃寃??섎㈃ ?쒕쾭? ?대씪?댁뼵?몄쓽 ?댁슜???쇱튂?댁꽌 ?ㅻ쪟媛 諛쒖깮?섏? ?딆븘??

### 臾댄븳 猷⑦봽 諛⑹?

`useEffect`?먯꽌 `addTranslation`???ъ슜???뚮뒗 ?섏〈??諛곗뿴??鍮꾩썙???댁슂:

```tsx
// ?щ컮瑜?諛⑸쾿
useEffect(() => {
  addTranslation('ko', 'my_text', '???띿뒪??);
  addTranslation('en', 'my_text', 'My text');
}, []); // 鍮?諛곗뿴

// ???섎せ??諛⑸쾿 (臾댄븳 猷⑦봽 諛쒖깮!)
useEffect(() => {
  addTranslation('ko', 'my_text', '???띿뒪??);
  addTranslation('en', 'my_text', 'My text');
}, [addTranslation]); // addTranslation???섏〈?깆뿉 ?ы븿
```

> ?닿쾶 萸붽???  
> - 鍮?諛곗뿴 `[]`: 而댄룷?뚰듃媛 泥섏쓬 濡쒕뱶??????踰덈쭔 ?ㅽ뻾
> - `[addTranslation]`: `addTranslation` ?⑥닔媛 諛붾??뚮쭏???ㅽ뻾 (臾댄븳 猷⑦봽!)

---

## ???먯＜ 臾삳뒗 吏덈Ц

### Q: ??留롮? ?몄뼱瑜?吏?먰븯?ㅻ㈃?
A: `addTranslation()` ?⑥닔瑜??ъ슜?댁꽌 ?숈쟻?쇰줈 異붽??????덉뒿?덈떎.

```tsx
addTranslation('ja', 'welcome', '?덀걝?볝걹'); // ?쇰낯??
addTranslation('fr', 'welcome', 'Bienvenue'); // ?꾨옉?ㅼ뼱
addTranslation('es', 'welcome', 'Bienvenido'); // ?ㅽ럹?몄뼱
```

### Q: 踰덉뿭?????섏삤硫?
A: 踰덉뿭 ?ㅺ? ?щ컮瑜몄? ?뺤씤?댁＜?몄슂. 湲곕낯 踰덉뿭 ?ㅻ뒗 "湲곕낯 ?쒓났 踰덉뿭 ?ㅻ뱾" ?뱀뀡??李멸퀬?섏꽭??

### Q: ?숈쟻?쇰줈 踰덉뿭??異붽??????덈굹??
A: ?? `addTranslation()` ?⑥닔瑜??ъ슜?섎㈃ ?고??꾩뿉 踰덉뿭??異붽??????덉뒿?덈떎.

### Q: ?몄뼱媛 諛붾뚯? ?딆븘??
A: `SimpleI18n` Provider媛 ?쒕?濡??ㅼ젙?섏뼱 ?덈뒗吏 ?뺤씤?댁＜?몄슂.

### Q: ?섏씠?쒕젅?댁뀡 ?ㅻ쪟媛 諛쒖깮?댁슂
A: "二쇱쓽?ы빆" ?뱀뀡???섏씠?쒕젅?댁뀡 臾몄젣 ?닿껐 諛⑸쾿??李멸퀬?댁＜?몄슂.

### Q: ?깅뒫??臾몄젣媛 ?덈굹??
A: 踰덉뿭???덈Т 留롮씠 異붽??섎㈃ ?깅뒫???곹뼢??以????덉뒿?덈떎. ?꾩슂??踰덉뿭留?異붽??섏꽭??

---

## ?깅뒫 理쒖쟻??

### 遺덊븘?뷀븳 踰덉뿭 ?ㅻ뒗 ?쒓굅?섏꽭??
```tsx
// ?섏걶 ?? ?ъ슜?섏? ?딅뒗 踰덉뿭 異붽?
addTranslation('ko', 'unused_text', '?ъ슜?섏? ?딅뒗 ?띿뒪??);

// 醫뗭? ?? ?꾩슂??踰덉뿭留?異붽?
addTranslation('ko', 'important_text', '以묒슂???띿뒪??);
```

### 遺덊븘?뷀븳 由щ젋?붾쭅??諛⑹??섏꽭??
```tsx
import { useMemo } from 'react';

function MyComponent() {
  const { t } = useSimpleI18n();
  
  // 踰덉뿭???띿뒪?몃? 硫붾え?댁젣?댁뀡 (?⑥닔 ?먯껜??硫붾え?댁젣?댁뀡 遺덊븘??
  const welcomeText = useMemo(() => t('welcome'), [t]);
  const helloText = useMemo(() => t('hello'), [t]);
  
  return (
    <div>
      <h1>{welcomeText}</h1>
      <p>{helloText}</p>
    </div>
  );
}
```

### ?숈쟻 踰덉뿭 異붽????꾩슂???쒖젏?먮쭔 ?섏꽭??
```tsx
// ?섏걶 ?? 留ㅻ쾲 ?뚮뜑留곹븷 ?뚮쭏??異붽?
function MyComponent() {
  const { addTranslation } = useSimpleI18n();
  
  addTranslation('ko', 'text', '?띿뒪??); // 留ㅻ쾲 ?ㅽ뻾??
  
  return <div>...</div>;
}

// 醫뗭? ?? ??踰덈쭔 異붽?
function MyComponent() {
  const { addTranslation } = useSimpleI18n();
  
  useEffect(() => {
    addTranslation('ko', 'text', '?띿뒪??); // ??踰덈쭔 ?ㅽ뻾??
  }, []);
  
  return <div>...</div>;
}
```

---

## 蹂댁븞

### 踰덉뿭 ?ㅻ뒗 ?좊ː?????덈뒗 ?뚯뒪?먯꽌留?媛?몄삤?몄슂
```tsx
// ?섏걶 ?? ?ъ슜???낅젰??洹몃?濡??ъ슜
const userKey = userInput; // ?꾪뿕!
t(userKey);

// 醫뗭? ?? ?덉슜???ㅻ쭔 ?ъ슜
const allowedKeys = ['welcome', 'hello', 'goodbye'];
if (allowedKeys.includes(userKey)) {
  t(userKey);
}
```

---

## ?ㅼ쓬 ?④퀎

### ??留롮? 湲곕뒫???꾩슂?섎떎硫?
- [HUA i18n SDK](https://github.com/HUA-Labs/HUA-Labs-public): 怨좉툒 湲곕뒫???덈뒗 ?꾩쟾??i18n SDK
- [Next.js Internationalization](https://nextjs.org/docs/advanced-features/i18n-routing): Next.js 怨듭떇 ?ㅺ뎅??吏??

### 而ㅻ??덊떚:
- [GitHub Issues](https://github.com/HUA-Labs/HUA-Labs-public/issues): 踰꾧렇 由ы룷??諛?湲곕뒫 ?붿껌
- [Discussions](https://github.com/HUA-Labs/HUA-Labs-public/discussions): 吏덈Ц 諛??좊줎

---

## ?쇱씠?좎뒪

MIT License - ?먯쑀濡?쾶 ?ъ슜?섏꽭??

---

## 湲곗뿬?섍린

踰꾧렇瑜?諛쒓껄?섍굅??媛쒖꽑 ?꾩씠?붿뼱媛 ?덉쑝?쒕㈃ ?몄젣?좎? 湲곗뿬?댁＜?몄슂!

1. [Fork](https://github.com/HUA-Labs/HUA-Labs-public/fork) this repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a [Pull Request](https://github.com/HUA-Labs/HUA-Labs-public/pulls)

---

**?뺣쭚 ??以꾨줈 ?쒖옉?섎뒗 ?ㅺ뎅??吏?? 吏湲?諛붾줈 ?쒖옉?대낫?몄슂!** 
