<script lang="tsx">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Line",
  data() {
    return {
      name: "summer",
    };
  },
  render() {
    return (
      <div>
        <h1>{this.name}</h1>
      </div>
    );
  },
});
</script>
