import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { GuetGuard } from './guards/guet.guard';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule),
    canLoad: [ GuetGuard ]
  },
  {
    path: 'marker',
    loadChildren: () => import('./pages/marker/marker.module').then( m => m.MarkerPageModule),
    canLoad: [ AuthGuard ]
  },
  {
    path: 'modal-marker',
    loadChildren: () => import('./pages/modal-marker/modal-marker.module').then( m => m.ModalMarkerPageModule),
    canLoad: [ AuthGuard ]
  },
  {
    path: 'setting',
    loadChildren: () => import('./pages/setting/setting.module').then( m => m.SettingPageModule),
    canLoad: [ AuthGuard ]
  },
  {
    path: 'cambio-clave',
    loadChildren: () => import('./pages/cambio-clave/cambio-clave.module').then( m => m.CambioClavePageModule),
    canLoad: [ AuthGuard ]
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule),
    canLoad: [ AuthGuard ]
  },
  {
    path: 'notificaciones',
    loadChildren: () => import('./pages/notificaciones/notificaciones.module').then( m => m.NotificacionesPageModule),
    canLoad: [ AuthGuard ]
  },
  {
    path: 'modal-info-notificacion',
    loadChildren: () => import('./pages/modal-info-notificacion/modal-info-notificacion.module').then( m => m.ModalInfoNotificacionPageModule),
    canLoad: [ AuthGuard ]
  },
  {
    path: 'personal-info',
    loadChildren: () => import('./pages/personal-info/personal-info.module').then( m => m.PersonalInfoPageModule),
    canLoad: [ AuthGuard ]
  },
  {
    path: 'btn-asistencias',
    loadChildren: () => import('./pages/btn-asistencias/btn-asistencias.module').then( m => m.BtnAsistenciasPageModule),
    canLoad: [ AuthGuard ]
  },
  {
    path: 'marcaciones',
    loadChildren: () => import('./pages/marcaciones/marcaciones.module').then( m => m.MarcacionesPageModule),
    canLoad: [ AuthGuard ]
  },
  {
    path: 'modal-info-marcaciones',
    loadChildren: () => import('./pages/modal-info-marcaciones/modal-info-marcaciones.module').then( m => m.ModalInfoMarcacionesPageModule),
    canLoad: [ AuthGuard ]
  },
  {
    path: 'modal-maps',
    loadChildren: () => import('./pages/modal-maps/modal-maps.module').then( m => m.ModalMapsPageModule),
    canLoad: [ AuthGuard ]
  },
  {
    path: 'registro-asistencia',
    loadChildren: () => import('./pages/registro-asistencia/registro-asistencia.module').then( m => m.RegistroAsistenciaPageModule),
    canLoad: [ AuthGuard ]
  },
  {
    path: 'modal-info-asistencias',
    loadChildren: () => import('./pages/modal-info-asistencias/modal-info-asistencias.module').then( m => m.ModalInfoAsistenciasPageModule),
    canLoad: [ AuthGuard ]
  },
  {
    path: 'solicitudes',
    loadChildren: () => import('./pages/solicitudes/solicitudes.module').then( m => m.SolicitudesPageModule),
    canLoad: [ AuthGuard ]
  },
  {
    path: 'vacaciones',
    loadChildren: () => import('./pages/vacaciones/vacaciones.module').then( m => m.VacacionesPageModule),
    canLoad: [ AuthGuard ]
  },
  {
    path: 'compensacion',
    loadChildren: () => import('./pages/compensacion/compensacion.module').then( m => m.CompensacionPageModule),
    canLoad: [ AuthGuard ]
  },
  {
    path: 'reportes',
    loadChildren: () => import('./pages/reportes/reportes.module').then( m => m.ReportesPageModule),
    canLoad: [ AuthGuard ]
  },
  {
    path: 'periodo-vacacion',
    loadChildren: () => import('./pages/periodo-vacacion/periodo-vacacion.module').then( m => m.PeriodoVacacionPageModule),
    canLoad: [ AuthGuard ]
  },
  {
    path: 'cuenta',
    loadChildren: () => import('./pages/cuenta/cuenta.module').then( m => m.CuentaPageModule),
    canLoad: [ AuthGuard ]
  },
  {
    path: 'periodo-utilizado',
    loadChildren: () => import('./pages/periodo-utilizado/periodo-utilizado.module').then( m => m.PeriodoUtilizadoPageModule),
    canLoad: [ AuthGuard ]
  },
  {
    path: 'modal-info-usados',
    loadChildren: () => import('./pages/modal-info-usados/modal-info-usados.module').then( m => m.ModalInfoUsadosPageModule),
    canLoad: [ AuthGuard ]
  },
  {
    path: 'modal-info-cuenta',
    loadChildren: () => import('./pages/modal-info-cuenta/modal-info-cuenta.module').then( m => m.ModalInfoCuentaPageModule),
    canLoad: [ AuthGuard ]
  },
  {
    path: 'permiso-solicitud',
    loadChildren: () => import('./pages/permiso-solicitud/permiso-solicitud.module').then( m => m.PermisoSolicitudPageModule),
    canLoad: [ AuthGuard ]
  },
  {
    path: 'permiso-consulta',
    loadChildren: () => import('./pages/permiso-consulta/permiso-consulta.module').then( m => m.PermisoConsultaPageModule),
    canLoad: [ AuthGuard ]
  },
  {
    path: 'modal-info-solicitud-permiso',
    loadChildren: () => import('./pages/modal-info-solicitud-permiso/modal-info-solicitud-permiso.module').then( m => m.ModalInfoSolicitudPermisoPageModule),
    canLoad: [ AuthGuard ]
  },
  {
    path: 'medica-consulta',
    loadChildren: () => import('./pages/medica-consulta/medica-consulta.module').then( m => m.MedicaConsultaPageModule),
    canLoad: [ AuthGuard ]
  },
  {
    path: 'modal-info-licencias',
    loadChildren: () => import('./pages/modal-info-licencias/modal-info-licencias.module').then( m => m.ModalInfoLicenciasPageModule),
    canLoad: [ AuthGuard ]
  },
  {
    path: 'btn-documental',
    loadChildren: () => import('./pages/btn-documental/btn-documental.module').then( m => m.BtnDocumentalPageModule),
    canLoad: [ AuthGuard ]
  },
  {
    path: 'documents',
    loadChildren: () => import('./pages/documents/documents.module').then( m => m.DocumentsPageModule),
    canLoad: [ AuthGuard ]
  },
  {
    path: 'modal-info-documentos',
    loadChildren: () => import('./pages/modal-info-documentos/modal-info-documentos.module').then( m => m.ModalInfoDocumentosPageModule),
    canLoad: [ AuthGuard ]
  },
  {
    path: 'doc-firma',
    loadChildren: () => import('./pages/doc-firma/doc-firma.module').then( m => m.DocFirmaPageModule),
    canLoad: [ AuthGuard ]
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
