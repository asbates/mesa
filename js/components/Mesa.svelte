<svelte:options accessors={true} />

<script>
  import MesaClient from './MesaClient.svelte';
  import MesaServerPagination from './MesaServerPagination.svelte';
  import MesaServerInfiniteScroll from './MesaServerInfiniteScroll.svelte';
  import { QueryClient, QueryClientProvider } from '@tanstack/svelte-query';

  export let id;
  export let columns = [];
  export let data = [];
  export let ssrOptions = {};

  const queryClient = new QueryClient();
</script>

<QueryClientProvider client={queryClient}>
  {#if !ssrOptions.useSSR}
    <MesaClient {id} {columns} {data} />
  {:else if ssrOptions.useSSR && ssrOptions.usePagination}
    <MesaServerPagination {id} {columns} />
  {:else if ssrOptions.useSSR && ssrOptions.useInfiniteScroll}
    <MesaServerInfiniteScroll {id} {columns} />
  {/if}
</QueryClientProvider>
