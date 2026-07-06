<template>
  <div class="min-h-screen flex items-center justify-center bg-slate-100">

    <div class="bg-white p-10 rounded-2xl shadow-xl space-y-4 w-96">

      <AppButton full>
        Primary
      </AppButton>

      <AppButton
        variant="secondary"
        full
      >
        Secondary
      </AppButton>

      <AppButton
        variant="danger"
        full
      >
        Delete
      </AppButton>

      <AppButton
        variant="outline"
        full
      >
        Outline
      </AppButton>

      <AppButton
        loading
        full
      >
        Saving...
      </AppButton>

    </div>

  </div>
</template>