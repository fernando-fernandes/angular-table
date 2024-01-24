import { Component, OnInit } from '@angular/core'
import { HeaderComponent } from '../../shared/header/header.component'
import { CalendarModule } from 'primeng/calendar'
import { DividerModule } from 'primeng/divider'
import { DropdownModule } from 'primeng/dropdown'
import { TableModule } from 'primeng/table'
import { FormsModule } from '@angular/forms'
import { CommonModule } from '@angular/common'
import { ApiService } from '../../services/api.service'

interface City {
  name: string
  code: string
}

interface Product {
  id?: string
  code?: string
  name?: string
  description?: string
  price?: number
  quantity?: number
  inventoryStatus?: string
  category?: string
  image?: string
  rating?: number
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
    DividerModule,
    DropdownModule,
    TableModule
  ],
})
export class HomeComponent implements OnInit {
  countries: any[] | undefined
  cities: City[] | undefined

  selectedCity: City | undefined

  products!: Product[]

  constructor(private productService: ApiService) { }


  ngOnInit() {
    this.cities = [
      { name: 'New York', code: 'NY' },
      { name: 'Rome', code: 'RM' },
      { name: 'London', code: 'LDN' },
      { name: 'Istanbul', code: 'IST' },
      { name: 'Paris', code: 'PRS' }
    ]

    this.productService.getProductsMini().then((data) => {
      this.products = data
    })
  }
}
