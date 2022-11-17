import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RestService } from '../Servicios/rest.service';

@Component({
  selector: 'app-publicacion',
  templateUrl: './publicacion.component.html',
  styleUrls: ['./publicacion.component.css']
})
export class PublicacionComponent implements OnInit {

  DataPubl: any | undefined | null;
  DataEmpleador: any | undefined | null;

  constructor(private route: ActivatedRoute, private Api: RestService) { }
  
  ngOnInit(): void {
    const ID = this.route.snapshot.paramMap.get('UidPubl')
    this.Api.GetPubl(ID).subscribe((res: any)=>{
      this.DataPubl = res;
      this.Api.GetUserID(res.UidUser).subscribe((res: any)=>{
        this.DataEmpleador = res;
      });
    });

    
  }

}
