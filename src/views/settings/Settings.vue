<template>
     <div class="p-8 max-w-5xl mx-auto min-h-screen bg-gray-50">
          <div class="bg-white shadow-md rounded-lg p-6 border border-gray-200">
               <h1 class="text-2xl font-bold text-blue-600 mb-2">⚙️ Configuración del Sistema</h1>
               <p class="text-gray-600 mb-6">
                    Administra aquí los aspectos clave del sistema: roles, permisos, preferencias de usuario,
                    personalización y mantenimiento.
               </p>

               <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <!-- Roles y permisos -->
                    <div class="bg-gray-50 border border-gray-200 rounded-lg p-4 shadow-sm">
                         <h2 class="text-lg font-semibold text-gray-800 mb-1">🔐 Roles y permisos</h2>
                         <p class="text-sm text-gray-600">
                              Define quién puede hacer qué. <br />
                              Implementa una gestión granular para diferentes perfiles como
                              <strong>Administrador</strong>, <strong>Agente</strong> o <strong>Usuario Final</strong>,
                              asegurando un acceso adecuado para cada rol.
                         </p>
                    </div>

                    <!-- Personalización -->
                    <div class="bg-gray-50 border border-gray-200 rounded-lg p-4 shadow-sm">
                         <h2 class="text-lg font-semibold text-gray-800 mb-1">🎨 Personalización</h2>
                         <p class="text-sm text-gray-600">
                              Adapta la plataforma a tu identidad visual. <br />
                              Próximamente podrás modificar el color de la interfaz, subir el logo de tu empresa y
                              personalizar etiquetas del sistema.
                         </p>
                    </div>

                    <!-- Notificaciones -->
                    <div class="bg-gray-50 border border-gray-200 rounded-lg p-4 shadow-sm">
                         <h2 class="text-lg font-semibold text-gray-800 mb-1">🔔 Notificaciones</h2>
                         <p class="text-sm text-gray-600">
                              Mantente informado en todo momento. <br />
                              Se integrará un sistema de alertas por correo electrónico o notificaciones internas sobre
                              nuevos tickets, comentarios o actualizaciones.
                         </p>
                    </div>

                    <!-- Gestión de datos -->
                    <div class="bg-gray-50 border border-gray-200 rounded-lg p-4 shadow-sm">
                         <h2 class="text-lg font-semibold text-gray-800 mb-1">🗄️ Gestión de datos</h2>
                         <p class="text-sm text-gray-600">
                              Control total sobre tu información. <br />
                              Desde este módulo podrás realizar respaldos, exportaciones y limpieza periódica de la base
                              de datos del sistema.
                         </p>
                    </div>
               </div>
          </div>
     </div>
</template>
