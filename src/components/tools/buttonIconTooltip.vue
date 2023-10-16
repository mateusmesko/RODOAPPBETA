<template>
    <v-btn icon>
        <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
                <v-icon
                    :color="corzinha"
                    dark
                    v-bind="attrs"
                    v-on="on"
                >
                    {{icon}}
                </v-icon>
            </template>

            <span>{{ title }}</span>
        </v-tooltip>
    </v-btn>
</template>

<script>
export default {
    name: 'buttonTooltip',

    props: {
		title: String,
		corzinha: String,
		icon:String
	},
};
</script>