<svelte:options accessors={true} />

<script>
  import {
    createSvelteTable,
    getCoreRowModel,
    flexRender,
  } from '@tanstack/svelte-table';
  import { writable } from 'svelte/store';
  import { registerMesaTable, resolveStyleOptions } from '../utils/mesa.js';

  export let id;
  export let columns = [];
  export let data = [];
  export let styleOptions = {};

  let options = writable({
    data: data,
    columns: columns,
    getCoreRowModel: getCoreRowModel(),
  });

  $: {
    options.update((oldOptions) => {
      return {
        ...oldOptions,
        columns: columns,
        data: data,
      };
    });
  }

  let table = createSvelteTable(options);
  registerMesaTable(id, table);

  $: resolvedStyleOptions = resolveStyleOptions(styleOptions);
</script>

<table {id} class={resolvedStyleOptions.tableClass}>
  <thead class={resolvedStyleOptions.theadClass}>
    {#each $table.getHeaderGroups() as headerGroup}
      <tr class={resolvedStyleOptions.trClass}>
        {#each headerGroup.headers as header}
          {#if !header.isPlaceholder}
            <th class={resolvedStyleOptions.thClass}>
              <svelte:component
                this={flexRender(
                  header.column.columnDef.header,
                  header.getContext(),
                )}
              />
            </th>
          {/if}
        {/each}
      </tr>
    {/each}
  </thead>
  <tbody class={resolvedStyleOptions.tbodyClass}>
    {#each $table.getRowModel().rows as row}
      <tr class={resolvedStyleOptions.trClass}>
        {#each row.getVisibleCells() as cell}
          <td class={resolvedStyleOptions.tdClass}>
            <svelte:component
              this={flexRender(cell.column.columnDef.cell, cell.getContext())}
            />
          </td>
        {/each}
      </tr>
    {/each}
  </tbody>
</table>
