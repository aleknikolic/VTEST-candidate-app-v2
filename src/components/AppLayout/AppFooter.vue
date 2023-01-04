<script setup lang="ts">
    import VtestLogo from "~/assets/common/logo.gif";
    import { useI18n } from "vue-i18n";
    import type { LocalizedContent } from "~/types/i18n";

    const { t } = useI18n<{ message: LocalizedContent }>();
</script>

<template>
    <div class="w-full grid grid-cols-3 footer">
        <div class=""></div>
        <div class="text-center">
            <div class="policy-font text-[11px] leading-[13px] text-black font-semibold">
                © VTEST 2022
                <a
                    href="https://www.vtest.com/privacy-policy/"
                    target="blank"
                    class="footer"
                    data-uw-rm-brl="false"
                    aria-label="Privacy Policy - opens in new window"
                    data-uw-rm-ext-link=""
                    uw-rm-external-link-id="https://www.vtest.com/privacy-policy/$privacypolicy"
                >
                    {{ t("general.privacyPolicy") }}
                </a>
            </div>
        </div>
        <div class="flex justify-end">
            <img :src="VtestLogo" style="margin-bottom: 10px; width: 150px; height: 52px" alt="text" />
        </div>
    </div>
</template>

<style lang="css">
    .policy-font {
        font-family: Georgia, "Lato", Times, "Times New Roman", serif !important;
    }
</style>
