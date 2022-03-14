import React from 'react';

const ElementsList = () => {

    return (
        <div className="d-flex flex-column justify-content-center align-items-center align-self-center p-lg-5 p-3 h-100 w-100">
            <h1>Elementos da UI</h1>
            <ul>
                <li>Componentes de formulários (input, select, radio, check, toggle, calendário, moeda, upload de arquivos, etc)</li>
                <li>Componentes de cards para produtos, galerias, dashboard e afins</li>
                <li>Componente de busca com a ação de buscar quando parar de digitar ou quando apertar enter</li>
                <li>Componente de toogle (liga/desliga)</li>
                <li>Componente de seleção de dia da semana</li>
                <li>Componente de slider de imagens e textos</li>
                <li>Componente de avatar</li>
                <li>Componente de modal</li>
                <li>Componente de estado do sistema ou toast (a decidir) (mensagens de erro, sucesso e alerta)</li>
                <li>Página de login, utilizando os componentes acima</li>
                <li>Página de cadastro e detalhes de usuários, utilizando os componentes acima</li>
                <li>Dashboard de pedidos, utilizando uma tabela que será cedida pelo curso e os elementos acima</li>
                <li>Página de configurações do sistema, utilizando os componentes acima</li>
                <li>Página de cadastro e gerenciamento de produtos</li>
                <li>Guia instalação Bootstrap: https://blog.logrocket.com/trying-out-the-new-bootstrap-5-with-react/</li>
            </ul>
        </div>
    )
}

export default ElementsList