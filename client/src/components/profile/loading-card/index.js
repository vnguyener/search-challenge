import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Skeleton from '@material-ui/lab/Skeleton';
import './styles.scss';

const LoadingCard = () => {
  return (
    <div className="loading-card-container">
      <Card className="loading-card">
        <Skeleton animation="wave" variant="rect" className="loading-card-media" />
        <CardContent>
          <Skeleton animation="wave" height={10} style={{ marginBottom: 6 }} />
          <Skeleton animation="wave" height={10} width="80%" />
        </CardContent>
      </Card>
    </div>
  );
};

export default LoadingCard;
