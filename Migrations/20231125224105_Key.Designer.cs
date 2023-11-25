﻿// <auto-generated />
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;
using project.Data;

#nullable disable

namespace project.Migrations
{
    [DbContext(typeof(DataContext))]
    [Migration("20231125224105_Key")]
    partial class Key
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "8.0.0")
                .HasAnnotation("Relational:MaxIdentifierLength", 63);

            NpgsqlModelBuilderExtensions.UseIdentityByDefaultColumns(modelBuilder);

            modelBuilder.Entity("project.Models.Todo", b =>
                {
                    b.Property<int>("TodoId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("TodoId"));

                    b.Property<string>("TodoBody")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("TodoPriority")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("TodoId");

                    b.ToTable("Todo");
                });
#pragma warning restore 612, 618
        }
    }
}