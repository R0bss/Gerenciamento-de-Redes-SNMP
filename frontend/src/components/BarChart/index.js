import React from 'react';
import { Chart } from "react-google-charts";
import MapaComponent from "react-component-component";

export default function BarChart(props) {
  

    return (
        <MapaComponent
            initialState={
                { dataLoadingStatus: 'loading', chartData: [] }
            }
            didMount={

                async function (component) {
                    component.setState({
                        dataLoadingStatus: props.status,
                        chartData: props.dataMapa,
                    })
                }
            }
        >
            {component => {
                return component.state.dataLoadingStatus === 'ready'  ? (
                    <Chart
                        width={'100%'}
                        height={'100%'}
                        chartType="ColumnChart"
                        loader={<div>Loading Chart</div>}
                        data={component.state.chartData}
                        options={{
                            title: props.title,
                            backgroundColor: '#32363F',
                            chartArea: {
                                width: '80%',
                                height: '75%'
                            },
                            annotations: {
                                textStyle: {
                                    fontSize: 14,
                                    bold: true,
                                    marginTop: 20,
                                    color:'#ffffff',
                                },
                                format:'0.0',
                            },
                            colors: [props.corMapa],
                            vAxis: {
                                title: props.tituloVertical,
                                titleTextStyle: {   
                                    bold: true,
                                    color:'#ffffff',
                                },                                       
                                textStyle:{ 
                                    fontSize: 16, 
                                    bold: true, 
                                    color:'#ffffff',
                                },
                                legend: 'none',
                            },
                            hAxis: {                            
                                titleTextStyle: {   
                                    bold: true,
                                    color:'#ffffff',
                                },                                       
                                textStyle:{ 
                                    fontSize: 16, 
                                    bold: true, 
                                    color:'#ffffff',
                                },
                                legend: 'none',
                            },
                           
                           
                            
                          
                        }}
                        rootProps={{ 'data-testid': '' }}
                    />
                ) : (
                        <><center><label> Não possui dados para esse grafico</label></center></>
                    )
            }
            }
        </MapaComponent>

    );
}
