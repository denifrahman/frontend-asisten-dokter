import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  {
    title: true,
    name: 'Dashboard'
  },
  {
    name: 'Dashboard',
    url: '/dashboard',
    icon: 'icon-speedometer',
    badge: {
      variant: 'info',
      text: 'NEW'
    }
  },
  {
    title: true,
    name: 'Mastering'
  },
  {
    name: 'Master',
    url: '/master',
    icon: 'icon-layers',
    children: [
      {
        name: 'Negara',
        url: '/master/negara-list',
        icon: 'icon-map'
      },
      {
        name: 'Provinsi',
        url: '/master/provinsi-list',
        icon: 'icon-location-pin'
      },
      {
        name: 'Agama',
        url: '/master/agama-list',
        icon: 'icon-location-pin'
      },
      {
        name: 'Client',
        url: '/master/client-list',
        icon: 'icon-location-pin'
      },
      {
        name: 'Faskes',
        url: '/master/faskes-list',
        icon: 'icon-location-pin'
      },
      {
        name: 'Instalasi',
        url: '/master/instalasi-list',
        icon: 'icon-location-pin'
      },
      {
        name: 'Lokasi Stok',
        url: '/master/lokasi-stok-list',
        icon: 'icon-location-pin'
      },
      {
        name: 'Menu',
        url: '/master/menu-list',
        icon: 'icon-location-pin'
      },
      {
        name: 'Pegawai',
        url: '/master/pegawai-list',
        icon: 'icon-location-pin'
      },
      {
        name: 'Pekerjaan',
        url: '/master/pekerjaan-list',
        icon: 'icon-location-pin'
      },
      {
        name: 'Pendidikan',
        url: '/master/pendidikan-list',
        icon: 'icon-location-pin'
      },
      {
        name: 'Unit',
        url: '/master/unit-list',
        icon: 'icon-location-pin'
      },
      {
        name: 'User',
        url: '/master/user-list',
        icon: 'icon-location-pin'
      },
    ]
  },
];
