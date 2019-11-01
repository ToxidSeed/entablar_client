<q-table class="no-shadow"            
            :data="serverData"
            :columns="columns"
            row-key="name"       
            @request="request"               
        >
          <q-tr slot="body" slot-scope="props" :props="props">
              <q-td key="nombre" :props="props">{{ props.row.nombre }}</q-td>
              <q-td key="flg_permite_nulos" :props="props">
                <q-checkbox  v-model="serverData[props.row.__index].flg_permite_nulos" @input="view_data(props)" true-value="1" false-value="0"/>
              </q-td> 
          </q-tr>
        </q-table> 