<template>
  <div class="py-5 md:py-0 -mx-3 px-3 sm:-mx-8 sm:px-8 bg-black/[0.15] dark:bg-transparent">
    <DarkModeSwitcher />
    <MainColorSwitcher />
    <MobileMenu />
    <div class="flex mt-[4.7rem] md:mt-0 overflow-hidden">
      <!-- BEGIN: Side Menu -->
      <nav class="side-nav">
        <router-link :to="{ name: 'dashboard' }" tag="a" class="intro-x flex items-center pl-5 pt-4 mt-3">
          <img alt="Buusama" class="w-6" src="@/assets/images/logo.svg" />
          <span class="hidden xl:block text-white text-lg ml-3"> MyGym </span>
        </router-link>
        <div class="side-nav__devider my-6"></div>
        <ul>
          <!-- BEGIN: First Child -->
          <template v-for="(menu, menuKey) in formattedMenu">
            <li v-if="menu == 'devider'" :key="menu + menuKey" class="side-nav__devider my-6"></li>
            <li v-else :key="menu + menuKey" v-if="checkRole(menu.role)">
              <SideMenuTooltip tag="a" :content="menu.title" :href="menu.subMenu
          ? 'javascript:;'
          : router.resolve({ name: menu.pageName }).path
          " class="side-menu" :class="{
          'side-menu--active': menu.active,
          'side-menu--open': menu.activeDropdown,
        }" @click="linkTo(menu, router, $event)">
                <div class="side-menu__icon">
                  <component :is="menu.icon" />
                </div>
                <div class="side-menu__title">
                  {{ menu.title }}
                  <div v-if="menu.subMenu" class="side-menu__sub-icon"
                    :class="{ 'transform rotate-180': menu.activeDropdown }">
                    <ChevronDownIcon />
                  </div>
                </div>
              </SideMenuTooltip>
              <!-- BEGIN: Second Child -->
              <transition @enter="enter" @leave="leave">
                <ul v-if="menu.subMenu && menu.activeDropdown">
                  <li v-for="(subMenu, subMenuKey) in menu.subMenu" :key="subMenuKey">
                    <SideMenuTooltip tag="a" :content="subMenu.title" :href="subMenu.subMenu
          ? 'javascript:;'
          : router.resolve({ name: subMenu.pageName }).path
          " class="side-menu" :class="{ 'side-menu--active': subMenu.active }"
                      @click="linkTo(subMenu, router, $event)">
                      <div class="side-menu__icon">
                        <ActivityIcon />
                      </div>
                      <div class="side-menu__title">
                        {{ subMenu.title }}
                        <div v-if="subMenu.subMenu" class="side-menu__sub-icon" :class="{
          'transform rotate-180': subMenu.activeDropdown,
        }">
                          <ChevronDownIcon />
                        </div>
                      </div>
                    </SideMenuTooltip>
                    <!-- BEGIN: Third Child -->
                    <transition @enter="enter" @leave="leave">
                      <ul v-if="subMenu.subMenu && subMenu.activeDropdown">
                        <li v-for="(lastSubMenu, lastSubMenuKey) in subMenu.subMenu" :key="lastSubMenuKey">
                          <SideMenuTooltip tag="a" :content="lastSubMenu.title" :href="lastSubMenu.subMenu
          ? 'javascript:;'
          : router.resolve({ name: lastSubMenu.pageName }).path
          " class="side-menu" :class="{ 'side-menu--active': lastSubMenu.active }"
                            @click="linkTo(lastSubMenu, router, $event)">
                            <div class="side-menu__icon">
                              <ZapIcon />
                            </div>
                            <div class="side-menu__title">
                              {{ lastSubMenu.title }}
                            </div>
                          </SideMenuTooltip>
                        </li>
                      </ul>
                    </transition>
                    <!-- END: Third Child -->
                  </li>
                </ul>
              </transition>
              <!-- END: Second Child -->
            </li>
          </template>
          <!-- END: First Child -->
        </ul>
      </nav>
      <!-- END: Side Menu -->
      <!-- BEGIN: Content -->
      <div class="content">
        <TopBar />
        <router-view />
      </div>
      <!-- END: Content -->
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, provide, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { helper as $h } from '@/common/utils/helper'
import { useSideMenuStore } from '@/stores/side-menu'
import TopBar from '@/components/top-bar/Main.vue'
import MobileMenu from '@/components/mobile-menu/Main.vue'
import DarkModeSwitcher from '@/components/dark-mode-switcher/Main.vue'
import MainColorSwitcher from '@/components/main-color-switcher/Main.vue'
import SideMenuTooltip from '@/components/side-menu-tooltip/Main.vue'
import { linkTo, nestedMenu, enter, leave } from './index'
import dom from '@left4code/tw-starter/dist/js/dom'

const loggedIn = localStorage.getItem('user') != null;
const userRole = loggedIn ? JSON.parse(localStorage.getItem('user') ?? '')?.role : null;

const route = useRoute()
const router = useRouter()
const formattedMenu = ref([])
const sideMenuStore = useSideMenuStore()
const sideMenu = computed(() => nestedMenu(sideMenuStore.menu, route))

provide('forceActiveMenu', (pageName) => {
  route.forceActiveMenu = pageName
  formattedMenu.value = $h.toRaw(sideMenu.value)
})

watch(
  computed(() => route.path),
  () => {
    delete route.forceActiveMenu
    formattedMenu.value = $h.toRaw(sideMenu.value)
  }
)

onMounted(() => {
  dom('body').removeClass('error-page').removeClass('login').addClass('main')
  formattedMenu.value = $h.toRaw(sideMenu.value)
})

const checkRole = (roles) => {
  return roles?.includes(userRole);
}
</script>
