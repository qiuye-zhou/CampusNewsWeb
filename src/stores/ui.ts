import {
    onMounted, reactive, ref, watch
} from 'vue'
import { useDark, useToggle } from '@vueuse/core'
import { defineStore } from 'pinia'
import { ViewportRecord } from './interfaces'

export const useUIStore = defineStore('ui', () => {
    const isDark = useDark({
        selector: 'html',
        attribute: 'data-theme',
        valueDark: 'dark',
        valueLight: 'light'
    })
    const naiveUIDark = reactive({ value: false })
    const toggleDark = useToggle(isDark)

    const viewport = ref<ViewportRecord>({} as never)
    const sidebarWidth = ref(250)
    const sidebarWidthCollapse = ref(sidebarWidth.value - 150)
    const sidebarCollapse = ref(!!viewport.value.mobile)

    onMounted(() => {
        naiveUIDark.value = isDark.value
    })

    watch(
        () => isDark.value,
        // eslint-disable-next-line no-shadow
        isDark => {
            naiveUIDark.value = isDark
        }
    )

    return {
        isDark,
        naiveUIDark,
        toggleDark,

        viewport,
        sidebarWidth,
        sidebarWidthCollapse,
        sidebarCollapse
    }
})

export { useUIStore as UIStore }
