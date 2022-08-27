<script lang="ts">
  import DashboardWidget from './DashboardWidget.svelte';

  let hour: number;
  let minute: number;
  let seconds: number;

  const updateTime = () => {
    const now = new Date();

    hour = now.getHours();
    minute = now.getMinutes();
    seconds = now.getSeconds();
  };

  const prefixZeroIfNeeded = (digit: number) => (digit < 10 ? `0${digit}` : digit);

  setInterval(updateTime, 1000);
</script>

<DashboardWidget px="0">
  <div class="flex justify-center text-3xl min-w-[8rem]">
    <span>{prefixZeroIfNeeded(hour) ?? '00'}</span>
    <span>:</span>
    <span>{prefixZeroIfNeeded(minute) ?? '00'}</span>
    <span>:</span>
    <span>{prefixZeroIfNeeded(seconds) ?? '00'}</span>
  </div>
</DashboardWidget>
