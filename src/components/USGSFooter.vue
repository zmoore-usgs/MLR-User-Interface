<template>
    <v-footer>
        <v-btn
            v-for="(link, i) in footerLinks"
            :key="i"
            :href="link.href"
            :title="link.title"
            text
        >{{link.name}}</v-btn>

        <v-spacer></v-spacer>

        <a href="https://firstgov.gov/" target="_blank" rel="noopener noreferrer">
            <v-img
                :src="require('../assets/footer_graphic_firstGov.jpg')"
                alt="USGS Logo"
                class="shrink mr-2"
                title="Link to the official US Government web portal"
                contain
                transition="scale-transition"
            />
        </a>
    </v-footer>
</template>

<script>
export default {
    name: "USGSFooter",

    data() {
        return {
            footerLinks: [
                {
                    href: "https://www.usgs.gov/accessibility.html",
                    title: "USGS web accessibility policy",
                    name: "Accessibility"
                },
                {
                    href: "https://www.usgs.gov/foia/",
                    title: "USGS Freedom of Information Act information",
                    name: "FOIA"
                },
                {
                    href: "https://www.usgs.gov/privacy.html",
                    title: "USGS privacy policies",
                    name: "Privacy"
                },
                {
                    href: "https://www.usgs.gov/policies_notices.html",
                    title: "USGS web policies and notices",
                    name: "Policies and Notices"
                }
            ]
        };
    }
};
</script>