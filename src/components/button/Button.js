import React from 'react';
import * as Icon from "react-feather";
import { Spinner } from "reactstrap";
import "./button.scss";

const Buttom = ({ children }) => {
    let subComponentList = Object.keys(Buttom);
    console.log(children)
    let subComponents = subComponentList ? subComponentList.map((key) => {
        return React.Children.map(children, (child) =>
            child.type && child.type.name === key ? child : null
        );
    }) : null;

    return (
        <>
            <button className='buttom-ui'>
                {children}
            </button>
        </>
    );
};

const Add = (props) => <button onClick={props.onClick} className={`buttom-ui add ${props.dark ? 'dark' : ''} ${props.md ? 'md' : ''} ${props.className ? props.className : ''}`} disabled={props.loading}><Icon.PlusCircle size={16} className="button-icon" /><>{props.loading &&<Spinner size='sm' />}<span className={`default-button-ui-text ${ props.loading ? 'processing' : ''}`}>Adicionar</span></></button>;
Buttom.Add = Add;

const Save = (props) => <button onClick={props.onClick} className={`buttom-ui save ${props.dark ? 'dark' : ''} ${props.md ? 'md' : ''} ${props.className ? props.className : ''}`} disabled={props.loading}><Icon.Save size={16} className="button-icon" /><>{props.loading &&<Spinner size='sm' />}<span className={`default-button-ui-text ${ props.loading ? 'processing' : ''}`}>Salvar</span></></button>;
Buttom.Save = Save;

const Confirm = (props) => <button onClick={props.onClick} className={`buttom-ui confirm ${props.dark ? 'dark' : ''} ${props.md ? 'md' : ''} ${props.className ? props.className : ''}`} disabled={props.loading}><Icon.CheckCircle size={16} className="button-icon" /><>{props.loading &&<Spinner size='sm' />}<span className={`default-button-ui-text ${ props.loading ? 'processing' : ''}`}>Confirmar</span></></button>;
Buttom.Confirm = Confirm;

const Archive = (props) => <button onClick={props.onClick} className={`buttom-ui confirm ${props.dark ? 'dark' : ''} ${props.md ? 'md' : ''} ${props.className ? props.className : ''}`} disabled={props.loading}><Icon.Archive size={16} className="button-icon" /><>{props.loading &&<Spinner size='sm' />}<span className={`default-button-ui-text ${ props.loading ? 'processing' : ''}`}>Arquivar</span></></button>;
Buttom.Archive = Archive;

const Unarchive = (props) => <button onClick={props.onClick} className={`buttom-ui confirm ${props.dark ? 'dark' : ''} ${props.md ? 'md' : ''} ${props.className ? props.className : ''}`} disabled={props.loading}><Icon.Archive size={16} className="button-icon" /><>{props.loading &&<Spinner size='sm' />}<span className={`default-button-ui-text ${ props.loading ? 'processing' : ''}`}>Desarquivar</span></></button>;
Buttom.Unarchive = Unarchive;

const Folder = (props) => <button onClick={props.onClick} className={`buttom-ui confirm ${props.dark ? 'dark' : ''} ${props.md ? 'md' : ''} ${props.className ? props.className : ''}`} disabled={props.loading}><Icon.Archive size={16} /><>{props.loading &&<Spinner size='sm' />}</></button>;
Buttom.Folder = Folder;


const Undo = (props) => <button onClick={props.onClick} className={`buttom-ui undo ${props.dark ? 'dark' : ''} ${props.md ? 'md' : ''} ${props.className ? props.className : ''}`} disabled={props.loading}><Icon.CornerUpLeft size={16} className="button-icon" /><>{props.loading &&<Spinner size='sm' />}<span className={`default-button-ui-text ${ props.loading ? 'processing' : ''}`}>Desfazer</span></></button>;
Buttom.Undo = Undo;

const Delete = (props) => <button onClick={props.onClick} className={`buttom-ui delete ${props.dark ? 'dark' : ''} ${props.md ? 'md' : ''} ${props.className ? props.className : ''}`} disabled={props.loading}><Icon.XCircle size={16} className="button-icon" /><>{props.loading &&<Spinner size='sm' />}<span className={`default-button-ui-text ${ props.loading ? 'processing' : ''}`}>Apagar</span></></button>;
Buttom.Delete = Delete;

const Cancel = (props) => <button onClick={props.onClick} className={`buttom-ui cancel ${props.dark ? 'dark' : ''} ${props.md ? 'md' : ''} ${props.className ? props.className : ''}`} disabled={props.loading}><Icon.SkipBack size={16} className="button-icon" /><>{props.loading &&<Spinner size='sm' />}<span className={`default-button-ui-text ${ props.loading ? 'processing' : ''}`}>Cancelar</span></></button>;
Buttom.Cancel = Cancel;

const Edit = (props) => <button onClick={props.onClick} className={`buttom-ui edit ${props.dark ? 'dark' : ''} ${props.md ? 'md' : ''} ${props.className ? props.className : ''}`} disabled={props.loading}><Icon.Edit2 size={16} /><>{props.loading &&<Spinner size='sm' />}</></button>;
Buttom.Edit = Edit;

const X = (props) => <button onClick={props.onClick} className={`buttom-ui exclude ${props.dark ? 'dark' : ''} ${props.md ? 'md' : ''} ${props.className ? props.className : ''}`} disabled={props.loading}><Icon.X size={16} /><>{props.loading &&<Spinner size='sm' />}</></button>;
Buttom.X = X;

const Primary = (props) => <button onClick={props.onClick} className={`buttom-ui primary ${props.dark ? 'dark' : ''} ${props.md ? 'md' : ''} ${props.className ? props.className : ''}`} disabled={props.loading}><>{props.loading &&<Spinner size='sm' />}<span className={`default-button-ui-text ${ props.loading ? 'processing' : ''}`}>{props.children}</span></></button>;
Buttom.Primary = Primary;

const Secondary = (props) => <button onClick={props.onClick} className={`buttom-ui secondary ${props.dark ? 'dark' : ''} ${props.md ? 'md' : ''} ${props.className ? props.className : ''}`} disabled={props.loading}><>{props.loading &&<Spinner size='sm' />}<span className={`default-button-ui-text ${ props.loading ? 'processing' : ''}`}>{props.children}</span></></button>;
Buttom.Secondary = Secondary;

const Default = (props) => <button onClick={props.onClick} className={`buttom-ui default ${props.dark ? 'dark' : ''} ${props.md ? 'md' : ''} ${props.className ? props.className : ''}`} disabled={props.loading}><>{props.loading &&<Spinner size='sm' />}<span className={`default-button-ui-text ${ props.loading ? 'processing' : ''}`}>{props.children}</span></></button>;
Buttom.Default = Default;

const Success = (props) => <button onClick={props.onClick} className={`buttom-ui success ${props.dark ? 'dark' : ''} ${props.md ? 'md' : ''} ${props.className ? props.className : ''}`} disabled={props.loading}><>{props.loading &&<Spinner size='sm' />}<span className={`default-button-ui-text ${ props.loading ? 'processing' : ''}`}>{props.children}</span></></button>;
Buttom.Success = Success;

const System = (props) => <button onClick={props.onClick} className={`buttom-ui system ${props.dark ? 'dark' : ''} ${props.md ? 'md' : ''} ${props.className ? props.className : ''}`} disabled={props.loading}><>{props.loading &&<Spinner size='sm' />}<span className={`default-button-ui-text ${ props.loading ? 'processing' : ''}`}>{props.children}</span></></button>;
Buttom.System = System;

const Info = (props) => <button onClick={props.onClick} className={`buttom-ui info ${props.dark ? 'dark' : ''} ${props.md ? 'md' : ''} ${props.className ? props.className : ''}`} disabled={props.loading}><>{props.loading &&<Spinner size='sm' />}<span className={`default-button-ui-text ${ props.loading ? 'processing' : ''}`}>{props.children}</span></></button>;
Buttom.Info = Info;

const Warning = (props) => <button onClick={props.onClick} className={`buttom-ui warning ${props.dark ? 'dark' : ''} ${props.md ? 'md' : ''} ${props.className ? props.className : ''}`} disabled={props.loading}><>{props.loading &&<Spinner size='sm' />}<span className={`default-button-ui-text ${ props.loading ? 'processing' : ''}`}>{props.children}</span></></button>;
Buttom.Warning = Warning;

const Danger = (props) => <button onClick={props.onClick} className={`buttom-ui danger ${props.dark ? 'dark' : ''} ${props.md ? 'md' : ''} ${props.className ? props.className : ''}`} disabled={props.loading}><>{props.loading &&<Spinner size='sm' />}<span className={`default-button-ui-text ${ props.loading ? 'processing' : ''}`}>{props.children}</span></></button>;
Buttom.Danger = Danger;

const SpanishGray = (props) => <button onClick={props.onClick} className={`buttom-ui spanish-gray ${props.dark ? 'dark' : ''} ${props.md ? 'md' : ''} ${props.className ? props.className : ''}`} disabled={props.loading}><>{props.loading &&<Spinner size='sm' />}<span className={`default-button-ui-text ${ props.loading ? 'processing' : ''}`}>{props.children}</span></></button>;
Buttom.SpanishGray = SpanishGray;


export default Buttom;