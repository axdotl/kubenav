import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonToast,
} from '@ionic/react';
import React, { useState } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';

import { saveTemporaryCredentials } from '../../../../utils/storage';

export interface IDigitalOceanProps extends RouteComponentProps {
  close: () => void;
}

const DigitalOcean: React.FunctionComponent<IDigitalOceanProps> = ({ close, history }: IDigitalOceanProps) => {
  const [token, setToken] = useState<string>('');
  const [error, setError] = useState<string>('');

  const handleToken = (event) => {
    setToken(event.target.value);
  };

  const importClusters = () => {
    if (token === '') {
      setError('API Token is missing.');
    } else {
      saveTemporaryCredentials({
        token: token,
        clusterID: '',
      });

      close();
      history.push('/settings/clusters/digitalocean');
    }
  };

  return (
    <IonCard>
      <div className="card-header-image">
        <img alt="DigitalOcean" src="/assets/card-header-digitalocean.png" />
      </div>
      <IonCardHeader>
        <IonCardTitle>Import from DigitalOcean</IonCardTitle>
      </IonCardHeader>

      <IonCardContent>
        <p className="paragraph-margin-bottom">
          Choose this option to import your Kubernetes clusters from DigitalOcean. You just have to provide a personal
          access token with read permissions.
        </p>

        <IonList className="paragraph-margin-bottom" lines="full">
          <IonItem>
            <IonLabel position="stacked">Personal Access Token</IonLabel>
            <IonInput type="text" required={true} value={token} onInput={handleToken} />
          </IonItem>
        </IonList>

        <IonButton expand="block" onClick={() => importClusters()}>
          Import from DigitalOcean
        </IonButton>
      </IonCardContent>

      <IonToast isOpen={error !== ''} onDidDismiss={() => setError('')} message={error} duration={3000} />
    </IonCard>
  );
};

export default withRouter(DigitalOcean);
