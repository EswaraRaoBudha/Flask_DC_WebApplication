         function findingMaxMpgCar(v_json, code) {
             return v_json.filter(
                 function(data) {
                     return data.MPG == code
                 }
             );
         }
         
         
         function findingMaxHorsePower(v_json, code) {
             return v_json.filter(
                 function(data) {
                     return data.HORSEPOWER == code
                 }
             );
         }
         
         
         function findingMaxWeight(v_json, code) {
             return v_json.filter(
                 function(data) {
                     return data.WEIGHT == code
                 }
             );
         }
         
         
         function findingMaxAccel(v_json, code) {
             return v_json.filter(
                 function(data) {
                     return data.ACCELERATION == code
                 }
             );
         }
         
         
         
         
         var ORIGIN_DIMPIE = dc.pieChart("#ORIGIN_DIMPIE");
         var HORSEPOWER_DimDonut = dc.pieChart("#HORSEPOWER_DimDonut");
         
         d3.json("/getCarsData", function(err, data) {
             if (err) throw err;
         	
         	// Getting Max MPG value and their CAR Name
         	max_mpg_val= Math.max.apply(Math,data.map(function(o) { return o.MPG; }))
             max_mpg_carname=findingMaxMpgCar(data,max_mpg_val)[0].CAR;
         	
         	max_hp_val= Math.max.apply(Math,data.map(function(o) { return o.HORSEPOWER; }))
             max_hp_carname=findingMaxHorsePower(data,max_hp_val)[0].CAR;
         	
         	
         	max_wt_val= Math.max.apply(Math,data.map(function(o) { return o.WEIGHT; }))
             max_wt_carname=findingMaxWeight(data,max_wt_val)[0].CAR;
         	
         	max_acl_val= Math.max.apply(Math,data.map(function(o) { return o.ACCELERATION; }))
             max_acl_carname=findingMaxAccel(data,max_acl_val)[0].CAR;
         	
         	$('#maxmpgcarname').text(max_mpg_carname);
         	$('#maxcarmpg').text(max_mpg_val);
         	
         	$('#maxwtcarname').text(max_hp_carname);
         	$('#maxcarwt').text(max_hp_val);
         	
         	$('#maxhpcarname').text(max_wt_carname);
         	$('#maxcarhp').text(max_wt_val);
         	
         	$('#maxaclcarname').text(max_acl_carname);
         	$('#maxcaracl').text(max_acl_val);
         	
         	
             var ndx = crossfilter(data);
             var all = ndx.groupAll();
         
         	
         	console.log(data);
            
             // Chart By  Hierarchy_regionDim
         
             var origin_dim = ndx.dimension(function(d) {
                 return d["ORIGIN"];
             });
             var origin_dim_grp = origin_dim.group();
         	console.log(origin_dim_grp);
         	
             ORIGIN_DIMPIE
                 .height(120)
                 .width(240)
                 .dimension(origin_dim)
                 .group(origin_dim_grp)
                 .legend(dc.legend())
                 .renderLabel(false);
         
                  ORIGIN_DIMPIE.render();
         		alert(ORIGIN_DIMPIE);
         		console.log(ORIGIN_DIMPIE);
         
         
         	var CYLINDERS_Bar = dc.barChart('#CYLINDERS_Bar');
         
             var CYLINDERS_BarDim = ndx.dimension(function(d) {
                 return d["CYLINDERS"];
             });
             var CYLINDERS_BarDimGrp = CYLINDERS_BarDim.group();
         
         	
             CYLINDERS_Bar
                 .width(240)
                 .height(230)
                 .x(d3.scale.ordinal())
                 .xUnits(dc.units.ordinal)
                 .brushOn(false)
                 .xAxisLabel('Hourly Sales')
                 .yAxisLabel('Order Nos')
                 .dimension(CYLINDERS_BarDim)
                 .barPadding(0.1)
                 .outerPadding(0.05)
                 .margins({
                     top: 10,
                     right: 0,
                     bottom: 80,
                     left: 80
                 })
                 .group(CYLINDERS_BarDimGrp)
                 .elasticY(true);
         
         		CYLINDERS_Bar.render();
            
            
            
                var HORSEPOWER_Dim = ndx.dimension(function(d) {
                 return d["HORSEPOWER"];
             });
             var HORSEPOWER_DimGrp = HORSEPOWER_Dim.group();
         	console.log(origin_dim_grp);
         	
             HORSEPOWER_DimDonut
                 .height(120)
                 .width(240)
                 .dimension(HORSEPOWER_Dim)
                 .group(HORSEPOWER_DimGrp)
                 .legend(dc.legend())
                 .renderLabel(false)
         		.innerRadius(20);
                  ORIGIN_DIMPIE.render();
         		 
         		HORSEPOWER_DimDonut.render();
         		
             }
         );