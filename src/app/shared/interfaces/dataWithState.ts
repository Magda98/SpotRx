export type DataWithSate<Tdata> =
	| {
			isLoading: true;
	  }
	| {
			isLoading: false;
			data: Tdata;
	  };
