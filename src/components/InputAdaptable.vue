<script>
export default {
    name: 'InputAdaptable',
    data() {
        return {
            localValue: undefined,
            id: Math.floor(Math.random() * 1000) + this.name
        }
    },

    props: {
        value: {
            type: [String, Number, Array]
        },
        field_type: {
            type: String,
            default: "string"
        },
        label: {
            type: String,
            required: false
        },
        name: {
            type: String,
            default: "field"
        },
        hint: {
            Type: String
        },
        error_message: {
            Type: String
        },
        options: {
            type: Array,
            required: false
        },
        options_value_field: {
            type: String,
            default: "id"
        },
        options_text_field: {
            type: String,
            default: "name"
        },
        check_on_blur: {
            Type: Boolean,
            default: true
        }
    },

    computed: {
        ShowHint() {
            return this.hint && !this.error_message;
        }
    },

    watch: {
        localValue: function () {
            this.$emit("input", this.localValue)
        },
        value: function () {
            this.localValue = this.value
        }
    },

    mounted() {
        this.localValue = this.value;
    },

    methods: {
        makeUpperCase(string) {
            return string.charAt(0).toUpperCase() + string.slice(1);
        },
        emitName() {
            this.$emit("blur", this.name);
        },
        emitNameOnBlur() {
            if (!this.check_on_blur) {
                return;
            }

            this.emitName();
        }
    },
}
</script>
<template>
    <div class="form-group">
        <label v-if="label" :for="id" class="form-label">{{ label }}</label>
        
        <input v-if="field_type == 'string'" v-model="localValue" :name="name" :id="id" type="text" class="form-control"
            @blur="emitNameOnBlur">

        <textarea v-if="field_type === 'text'" v-model="localValue" :name="name" :id="id" cols="30" rows="5"
        class="form-control" @blur="emitNameOnBlur"></textarea>

        <input v-if="field_type == 'password'" v-model="localValue" :name="name" :id="id" type="password"
            class="form-control" @blur="emitNameOnBlur">

        <input v-if="field_type == 'number'" v-model="localValue" :name="name" :id="id" type="number" class="form-control"
            @blur="emitNameOnBlur">

        <input v-if="field_type == 'datetime'" v-model="localValue" :name="name" :id="id" type="datetime-local"
        @blur="emitNameOnBlur">

        <select v-if="field_type == 'select'" v-model="localValue" :name="name" :id="id" class="col-12 form-select">
            <option value="-1" disabled>Select option</option>
            <option v-for="option in options" :key="option[options_value_field]" :value="option[options_value_field]">
                {{ makeUpperCase(option[options_text_field]) }}
            </option>
        </select>

        <p v-if="error_message" class="alert alert-danger py-2 my-1">{{ error_message }}</p>
        <p v-if="ShowHint">{{ hint }}</p>
    </div>
</template>