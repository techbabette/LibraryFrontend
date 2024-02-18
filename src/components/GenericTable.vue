<script>
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
            return this.Items && this.Items.length > 0;
        }
    },
    methods: {
        ApplyChanges(InputValue, Header) {
            if (!Header.Change) {
                return InputValue
            }

            return Header.Change(InputValue);
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
                    <th v-for="Header, index in Headers" :key="index">{{ Header.Text }}</th>
                    <th v-if="Options">Options</th>
                </tr>
            </thead>
            <tbody id="table-result-holder">
                <tr v-for="Item, index in Items" :key="index">
                    <td>{{ index + 1 }}</td>
                    <td v-for="Header, hIndex in Headers" :key="hIndex">{{ ApplyChanges(Item[Header.Field], Header) }}</td>
                    <td v-if="Options">
                        <button v-for="Option, oIndex in Options" :data-id="Item[identification_field]" :key="oIndex"
                            :class="Option.Class" @click="Option.onClick">{{ Option.Name }}</button>
                    </td>
                </tr>
            </tbody>
            <button v-for="TableOption, index in table_options" @click="TableOption.onClick" :class="TableOption.Class"
                :key="index">{{ TableOption.Name }}</button>
        </table>
        <p v-else>No items found</p>
    </div>
</template>