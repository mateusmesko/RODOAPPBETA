<template>
    <tr>
        <th v-for="item in toobarList" class="text-left">
            {{ $t(item.title) }}
        </th>
	</tr>
</template>

<script>
export default {
    name: 'ToolBar',
    
    props:{
        toobarList: Array
    },

    data: () => ({
        toolbartTitles:[
            {title:'request.table.numberRequest'},
            {title:'request.table.NumberNotes'},
            {title:'request.table.supplier'},
            {title:'request.table.statusShip'},
            {title:'request.table.statusOrdem'},
            {title:'request.table.statusPay'},
            {title:'request.table.actions'}
        ],
    })


}
</script>