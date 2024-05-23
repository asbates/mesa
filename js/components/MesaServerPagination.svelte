<svelte:options accessors={true} />

<script>
  import {
    createSvelteTable,
    getCoreRowModel,
    flexRender,
  } from '@tanstack/svelte-table';
  import { writable, derived } from 'svelte/store';
  import { createQuery } from '@tanstack/svelte-query';
  import { fetchDataPagination } from '../utils/fetchData.js';
  import { registerMesaTable } from '../utils/mesa.js';

  export let id;
  export let columns = [];

  const pagination = writable({
    pageIndex: 1,
    pageSize: 10,
  });
  const setPagination = (updater) => {
    if (updater instanceof Function) {
      pagination.set(updater($pagination));
    } else {
      pagination.set(updater);
    }
  };

  const query = createQuery(
    derived(pagination, ($pagination) => ({
      queryKey: ['mesa', id, $pagination],
      queryFn: () => fetchDataPagination(id, $pagination),
    })),
  );

  const options = derived([query, pagination], ([$query, $pagination]) => ({
    columns,
    data: $query?.data ?? [],
    getCoreRowModel: getCoreRowModel(),
    pageCount: -1,
    state: {
      $pagination,
    },
    onPaginationChange: setPagination,
    manualPagination: true,
  }));

  let table = createSvelteTable(options);

  registerMesaTable(id, table);
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
<div>
  <button on:click={$table.previousPage()}>prev</button>
  <button on:click={$table.nextPage()}>next</button>
</div>
