"use client";

export function DashboardForUsers() {
  return (
    <div className="flex-1 flex flex-col">
      <div className="flex-1 flex-shrink-0">
        <div className="border rounded m-4 py-2 px-4">
          <h1>Seu InValve</h1>
        </div>

        <div className="border rounded grid grid-cols-2 m-4 py-2 px-4">
          <div>Ações</div>

          {/* Contexto das ações */}
          <div>Contexto</div>
        </div>

        {/* Contexto do Hidrocontrolador */}
        <div className="border rounded m-4 py-2 px-4">
          <h2>Contexto Secundário</h2>
          <p>Subtítulo</p>
        </div>

        <div className="border rounded grid grid-cols-2 m-4 py-2 px-4">
          <div>Ações Específicas</div>
          <div>Informações específicas</div>
        </div>
      </div>
    </div>
  );
}
