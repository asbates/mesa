<svelte:options accessors={true} />

<script>
  import MesaClient from './MesaClient.svelte';
  import MesaServerPagination from './MesaServerPagination.svelte';
  import { QueryClient, QueryClientProvider } from '@tanstack/svelte-query';
  // import MesaServerPaginationNoQuery from './MesaServerPaginationNoQuery.svelte';

  export let id;
  export let columns = [];
  export let data = [];
  export let ssrOptions = {};
  export let paginationOptions = {};

  const queryClient = new QueryClient();
</script>

<QueryClientProvider client={queryClient}>
  {#if !ssrOptions.useSSR}
    <MesaClient {id} {columns} {data} {paginationOptions} />
  {:else if ssrOptions.useSSR && ssrOptions.usePagination}
    <MesaServerPagination {id} {columns} {paginationOptions} />
  {/if}
</QueryClientProvider>
