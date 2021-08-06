<script lang="ts">
// eslint-disable-next-line no-undef
const createSlot = (children: JSX.Element, slotName = "default") => ({
  [slotName]: () => [children],
});
export default createSlot;
</script>
