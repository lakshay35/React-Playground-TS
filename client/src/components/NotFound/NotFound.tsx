import * as React from 'react';;
import './NotFound.scss';
import { History } from 'history';

interface Props {
    history: History<any>
}

class NotFound extends  React.Component<Props> {
    
    render() {
        return (
            <div>
                <h1>Not Found!</h1>
            </div>
        )
    }
}

export default NotFound;