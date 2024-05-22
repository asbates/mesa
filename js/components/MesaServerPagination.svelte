<svelte:options accessors={true} />

<script>
  import {
    createSvelteTable,
    getCoreRowModel,
    flexRender,
  } from '@tanstack/svelte-table';
  import { writable, derived } from 'svelte/store';
  import { createQuery } from '@tanstack/svelte-query';

  export let id;
  export let columns = [];

  const fetchData = async (pagination) => {
    const url = window.mesa.tableRegistry.find((table) => table.id === id).url;
    const response = await fetch(`${url}?pageIndex=${pagination.pageIndex}`);
    const data = await response.json();
    return data;
  };

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
      queryFn: () => fetchData($pagination),
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

  const registerTableInstance = (id, instance) => {
    const tableIsRegistered =
      window.mesa.tableRegistry.filter((table) => table.id === id).length > 0
        ? true
        : false;

    if (!tableIsRegistered) {
      window.mesa.tableRegistry.push({ id: msg.id, instance: instance });
      return;
    }

    window.mesa.tableRegistry.forEach((table) => {
      if (table.id === id) {
        table.instance = instance;
        return table;
      } else {
        return table;
      }
    });
  };
  registerTableInstance(id, table);
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

<style>
  .sticky {
    position: sticky;
    top: 0;
    background-color: #242424;
    z-index: 1;
  }
</style>
