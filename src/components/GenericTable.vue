<script>
import axios from '@/axios/axios';

export default {
    name: "GenericTable",
    props: {
        items: {
            Type: Array
        },
        headers: {
            Type: Array
        },
        options: {
            Type: Array
        },
        table_options: {
            Type: Array
        },
        identification_field: {
            Type: String,
            default: "id"
        }
    },
    computed: {
        ShowTable: function () {
            return this.items && this.items.length > 0;
        }
    },
    methods: {
        ApplyChanges(InputValue, header) {
            if (!header.Change) {
                return InputValue
            }

            return header.Change(InputValue);
        },
        async handleClick(onClick, callerId){
            let httpVerbs = ["get", "post", "put", "delete", "patch"];
            let verb = onClick.split('|')[0];
            let target = onClick.split('|')[1];

            if(verb === "dispatch"){
                await this.$store.dispatch(target, callerId);
            }

            let url = target + (callerId ? `/${callerId}` : "");
            if(httpVerbs.includes(verb)){
                await axios({method : verb, url})
            }
        }
    }
}
</script>
<template>
    <div class="table-responsive">
        <table v-if="ShowTable" class="table table-responsive table-hover" id="element-table">
            <thead>
                <tr id="header-table-row">
                    <th>#</th>
                    <th v-for="header, index in headers" :key="index">{{ header.Text }}</th>
                    <th v-if="options">Options</th>
                </tr>
            </thead>
            <tbody id="table-result-holder">
                <tr v-for="Item, index in items" :key="index">
                    <td>{{ index + 1 }}</td>
                    <td v-for="header, hIndex in headers" :key="hIndex">{{ ApplyChanges(Item[header.Field], header) }}</td>
                    <td v-if="options">
                        <button v-for="option, oIndex in options" :data-id="Item[identification_field]" :key="oIndex"
                            :class="option.Class" @click="handleClick(option.onClick, Item[identification_field])">{{ option.Name }}</button>
                    </td>
                </tr>
            </tbody>
            <button v-for="table_option, index in table_options" @click="handleClick(option.onClick, 0)" :class="table_option.Class"
                :key="index">{{ table_option.Name }}</button>
        </table>
        <p v-else>No items found</p>
    </div>
</template>