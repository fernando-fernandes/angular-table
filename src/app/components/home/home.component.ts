import { Component, OnInit } from '@angular/core'
import { HeaderComponent } from '../../shared/header/header.component'
import { CalendarModule } from 'primeng/calendar'
import { DropdownModule } from 'primeng/dropdown'
import { TableModule } from 'primeng/table'
import { FormsModule } from '@angular/forms'
import { CommonModule } from '@angular/common'
import { ApiService } from '../../services/api.service'
import { TagModule } from 'primeng/tag'
import { ButtonModule } from 'primeng/button'
import { MessageService, SelectItem } from 'primeng/api'
import { ToastModule } from 'primeng/toast'
import { InputTextModule } from 'primeng/inputtext'



interface City {
  name: string
  code: string
}
interface Product {
  id: string,
  nomeAluno: string,
  serieEscolar: string,
  nomeResponsavel: string,
  celularResponsavel: string,
  emailResponsavel: string,
  dadosAtualizados: string,
  dataAtualizacao: string,
  atualizadoPor: string,
  statusIt: string,
}

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  imports: [
    FormsModule,
    CommonModule,
    HeaderComponent,
    CalendarModule,
    DropdownModule,
    TableModule,
    TagModule,
    ButtonModule,
    ToastModule,
    InputTextModule
  ],
  providers: [MessageService]
})
export class HomeComponent implements OnInit {

  countries: any[] | undefined
  cities: City[] | undefined
  selectedCity: City | undefined
  products!: Product[]
  statuses!: SelectItem[]
  clonedProducts: { [s: string]: Product } = {};

  constructor(private productService: ApiService, private messageService: MessageService) { }


  ngOnInit() {


    this.productService.getProductsMini().then((data) => {
      this.products = data
    })

    this.statuses = [
      { label: 'Sim', value: '1' },
      { label: 'Não', value: '2' }
    ]

    this.cities = [
      { name: 'New York', code: 'NY' },
      { name: 'Rome', code: 'RM' },
      { name: 'London', code: 'LDN' },
      { name: 'Istanbul', code: 'IST' },
      { name: 'Paris', code: 'PRS' }
    ]
  }

  onRowEditInit(product: Product) {
    this.clonedProducts[product.id as string] = { ...product }
  }

  onRowEditSave(product: Product) {
    // if (product.price > 0) {
    //   delete this.clonedProducts[product.id as string]
    //   this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Product is updated' })
    // } else {
    //   this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Invalid Price' })
    // }

    this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Os dados do aluno foram atualizados.' })
  }

  onRowEditCancel(product: Product, index: number) {
    this.products[index] = this.clonedProducts[product.id as string]
    delete this.clonedProducts[product.id as string]
  }
}
