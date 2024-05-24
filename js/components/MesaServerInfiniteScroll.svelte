<script>
  import {
    createInfiniteQuery,
    keepPreviousData,
  } from '@tanstack/svelte-query';
  import {
    createSvelteTable,
    getCoreRowModel,
    flexRender,
  } from '@tanstack/svelte-table';
  import { derived } from 'svelte/store';
  import inView from '../utils/inView.js';
  import { fetchDataInfiniteScroll } from '../utils/fetchData.js';
  import { registerMesaTable, resolveStyleOptions } from '../utils/mesa.js';

  export let id;
  export let columns = [];
  export let styleOptions = {};

  let query = createInfiniteQuery({
    queryKey: ['mesa', 'infinite'],
    queryFn: (pageParam) => fetchDataInfiniteScroll(id, pageParam),
    initialPageParam: 1,
    getPreviousPageParam: (firstPage) => firstPage.previousCursor,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    placeholderData: keepPreviousData,
    maxPages: 3,
  });

  let flatData = derived(query, ($query) => {
    return $query.data?.pages.flatMap((page) => page.data) ?? [];
  });

  let options = derived(flatData, ($flatData) => {
    return {
      data: $flatData,
      columns: columns,
      getCoreRowModel: getCoreRowModel(),
    };
  });

  let table = createSvelteTable(options);
  registerMesaTable(id, table);

  $: resolvedStyleOptions = resolveStyleOptions(styleOptions);

  let container;
</script>

<div class="mesa-scroll-container" bind:this={container}>
  <div
    use:inView
    on:intersecting={() => {
      if ($query.hasPreviousPage && !$query.isFetchingPreviousPage) {
        $query.fetchPreviousPage();
        container.scroll({ top: 5 });
      }
    }}
  ></div>
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
  <div
    class="mesa-intersector"
    use:inView
    on:intersecting={() => {
      if ($query.hasNextPage && !$query.isFetchingNextPage) {
        $query.fetchNextPage();
        container.scroll({ top: container.clientHeight - 10 });
      }
    }}
  ></div>
</div>

<style>
  .mesa-scroll-container {
    height: 400px;
    overflow-y: scroll;
  }
  .mesa-intersector {
    height: 5px;
  }
</style>
