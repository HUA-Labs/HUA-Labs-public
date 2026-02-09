import { PresetConfig } from '@hua-labs/motion-core';

/**
 * Product Preset
 *
 * 기본 여백 + 기본 모션 설정
 * 제품 페이지, 대시보드 등 일반적인 제품 UI에 적합
 */

/**
 * Product Preset Configuration
 *
 * - 보수적인 모션 (빠른 전환, 최소한의 딜레이)
 * - 일관된 스페이싱 (md 기본값)
 * - 호버/클릭 인터랙션 최소화
 */
declare const productPreset: {
    /**
     * Motion Presets for Product UI
     */
    readonly motion: PresetConfig;
    /**
     * Spacing Guidelines
     *
     * - 기본 스페이싱: md (8px)
     * - 섹션 간격: lg (16px)
     * - 컴포넌트 내부: sm (4px)
     */
    readonly spacing: {
        readonly default: "md";
        readonly section: "lg";
        readonly component: "sm";
    };
    /**
     * i18n Configuration
     */
    readonly i18n: {
        readonly defaultLanguage: "ko";
        readonly supportedLanguages: readonly ["ko", "en"];
    };
    /**
     * Icon Configuration
     *
     * - Phosphor Icons (기본값)
     * - Regular weight (깔끔한 스타일)
     * - 20px 기본 크기
     */
    readonly icons: {
        readonly set: "phosphor";
        readonly weight: "regular";
        readonly size: 20;
        readonly color: "currentColor";
    };
};
type ProductPreset = typeof productPreset;

/**
 * Marketing Preset
 *
 * 랜딩 페이지 모션 중심 설정
 * 마케팅 페이지, 랜딩 페이지에 적합
 */

/**
 * Marketing Preset Configuration
 *
 * - 드라마틱한 모션 (느린 전환, 긴 딜레이)
 * - 넓은 스페이싱 (xl 기본값)
 * - 호버/클릭 인터랙션 강조
 */
declare const marketingPreset: {
    /**
     * Motion Presets for Marketing UI
     */
    readonly motion: PresetConfig;
    /**
     * Spacing Guidelines
     *
     * - 기본 스페이싱: xl (24px)
     * - 섹션 간격: xl (32px+)
     * - 컴포넌트 내부: md (8px)
     */
    readonly spacing: {
        readonly default: "xl";
        readonly section: "xl";
        readonly component: "md";
    };
    /**
     * i18n Configuration
     */
    readonly i18n: {
        readonly defaultLanguage: "ko";
        readonly supportedLanguages: readonly ["ko", "en"];
    };
    /**
     * Icon Configuration
     *
     * - Phosphor Icons (기본값)
     * - Bold weight (임팩트 있는 스타일)
     * - 24px 기본 크기 (마케팅용으로 크게)
     */
    readonly icons: {
        readonly set: "phosphor";
        readonly weight: "bold";
        readonly size: 24;
        readonly color: "currentColor";
    };
};
type MarketingPreset = typeof marketingPreset;

export { type MarketingPreset, type ProductPreset, marketingPreset, productPreset };
