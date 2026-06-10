<script>
export default {
  name: 'CaixaTexto',
  props: {
    label: {
      type: String,
      required: true,
    },
    modelValue: {
      type: [String, Number],
      default: '',
    },
    tipo: {
      type: String,
      default: 'text',
    },
    multiLinha: {
      type: Boolean,
      default: false,
    },
    readonly: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['update:modelValue'],
  methods: {
    aoMudar(e) {
      this.$emit('update:modelValue', e.target.value)
    },
  },
}
</script>

<template>
  <div class="campo-texto">
    <label class="label">{{ label }}</label>
    <textarea
      v-if="multiLinha"
      class="input textarea"
      :value="modelValue"
      @input="aoMudar"
      :readonly="readonly"
    ></textarea>
    <input
      v-else
      class="input"
      :type="tipo"
      :value="modelValue"
      @input="aoMudar"
      :readonly="readonly"
    />
  </div>
</template>

<style scoped>
.campo-texto {
  margin-bottom: 12px;
}
.label {
  font-weight: bold;
  display: block;
  margin-bottom: 4px;
}
.input {
  width: 100%;
  border: 1px solid #ccc;
  border-radius: 6px;
  padding: 12px;
  box-sizing: border-box;
  background-color: #fff;
  font-size: 14px;
}
.textarea {
  min-height: 90px;
  resize: vertical;
}
</style>
