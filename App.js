import React, {Component} from 'react';
import {ActivityIndicator, FlatList, Text, View} from 'react-native';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      isLoading: true,
    };
  }

  componentDidMount() {
    fetch('https://c19vaers.cloudrefactor.net/api/tsdb/query', {
      headers: {
        accept: 'application/json',
        accept_language: 'en-US,en;q=0.9',
        content_type: 'application/json',
        sec_fetch_dest: 'empty',
        sec_fetch_mode: 'cors',
        sec_fetch_site: 'same-origin',
        sec_gpc: '1',
        x_grafana_org_id: '1',
      },
      referrer:
        'https://c19vaers.cloudrefactor.net/d-solo/y0-yuDfMz/cloud-refactor-web-v1-6-mit-pathcheck?orgId=1&from=1610980174466&to=1612276174466&panelId=43',
      referrerPolicy: 'strict-origin-when-cross-origin',
      body:
        '{“from“:“1610980174466“,“to“:“1612276174466“,“queries“:[{“refId“:“A“,“intervalMs“:600000,“maxDataPoints“:1815,“datasourceId“:1,“rawSql“:“select  now() as \\“time\\“, loc.state as metric,   sum(vacc.administered_dose1) as value from sample_data.location loc,   sample_data.vacc_campaign_usa vacc where vacc.location_id = loc.location_id and last_updated_dt is not null and vacc.last_updated_dt = (select max(last_updated_dt) from sample_data.vacc_campaign_usa ) and state_flg = ‘Y’ and country = ‘United States’ group by loc.state order by sum(vacc.administered_dose1) desc limit 10;“,“format“:“time_series“}]}',
      method: 'POST',
      mode: 'cors',
      credentials: 'omit',
    })
      .then((response) => response.text())
      
      .then((responseData) => {
        this.setState({data: responseData});
        (responseData) => console.log(responseData);
      })
      
      .catch((error) => console.error(error))
      .finally(() => {
        this.setState({isLoading: false});
      });
  }

  render() {
    const {data, isLoading} = this.state;

    return (
      <View style={{flex: 1, padding: 24}}>
        {isLoading ? (
          <ActivityIndicator />
        ) : (
          <FlatList
            data={data}
            keyExtractor={({id}, index) => id}
            renderItem={({item}) => (
              <Text>
                {item.name}, {item.points}
              </Text>
            )}
          />
        )}
      </View>
    );
  }
}
