import * as React from 'react';
import { useParams } from 'react-router-dom';

const withRouter = Edit => props => {
    const params = useParams();
    // etc... other react-router-dom v6 hooks
  
    return (
      <Edit
        {...props}
        params={params}
        // etc...
      />
    );
  };

export default withRouter;