<svelte:options accessors={true} />

<script>
  import {
    createSvelteTable,
    getCoreRowModel,
    flexRender,
  } from '@tanstack/svelte-table';
  import { writable } from 'svelte/store';

  export let id;
  export let columns = [];
  export let data = [];

  let options = writable({
    data: data,
    columns: columns,
    getCoreRowModel: getCoreRowModel(),
  });

  let table = createSvelteTable(options);

  window.mesa.tableRegistry.push({
    id: id,
    instance: table,
  });
</script>

<table {id} class="mesa">
  <thead>
    {#each $table.getHeaderGroups() as headerGroup}
      <tr>
        {#each headerGroup.headers as header}
          {#if !header.isPlaceholder}
            <th class="sticky">
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
  <tbody>
    {#each $table.getRowModel().rows as row}
      <tr>
        {#each row.getVisibleCells() as cell}
          <td>
            <svelte:component
              this={flexRender(cell.column.columnDef.cell, cell.getContext())}
            />
          </td>
        {/each}
      </tr>
    {/each}
  </tbody>
</table>

<style>
  .sticky {
    position: sticky;
    top: 0;
    background-color: #242424;
    z-index: 1;
  }
</style>
