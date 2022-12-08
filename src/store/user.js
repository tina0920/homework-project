import { acceptHMRUpdate, defineStore } from 'pinia';
// 這邊 defineStore 會自動動態註冊模組，回傳值為 hook function, 包含 state, getters, actions
export const useUserStore = defineStore('user', () => {
    /**
     * Current name of the user.
     */
    const savedName = ref('');
    const previousNames = ref(new Set());
    const usedNames = computed(() => Array.from(previousNames.value));
    const otherNames = computed(() => usedNames.value.filter(name => name !== savedName.value));
    /**
     * Changes the current name of the user and saves the one that was used
     * before.
     *
     * @param name - new name to set
     */
    function setNewName(name) {
        if (savedName.value)
            previousNames.value.add(savedName.value);
        savedName.value = name;
    }
    return {
        setNewName,
        otherNames,
        savedName,
    };
});
if (import.meta.hot)
    import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot));
